const Feedback = require("../models/feedback.model");
const ApiResponse = require("../utils/ApiResponse");

// Submit Feedback (Student)
const submitFeedbackController = async (req, res) => {
  try {
    const {
      feedbackFormId,
      facultyId,
      subjectId,
      branchId,
      semester,
      teachingQuality,
      knowledgeOfSubject,
      communication,
      punctuality,
      overallRating,
      strengths,
      improvements,
      additionalComments,
      isAnonymous,
    } = req.body;

    // Validate required fields
    if (!facultyId || !subjectId || !branchId || !semester) {
      return ApiResponse.badRequest("Faculty, Subject, Branch, and Semester are required").send(res);
    }

    if (!teachingQuality || !knowledgeOfSubject || !communication || !punctuality || !overallRating) {
      return ApiResponse.badRequest("All rating fields are required").send(res);
    }

    // If feedbackFormId provided, validate the form
    if (feedbackFormId) {
      const FeedbackForm = require("../models/feedback-form.model");
      const form = await FeedbackForm.findById(feedbackFormId);
      
      if (!form) {
        return ApiResponse.notFound("Feedback form not found").send(res);
      }

      if (!form.isActive) {
        return ApiResponse.badRequest("This feedback form is no longer active").send(res);
      }

      const now = new Date();
      if (now < form.startDate || now > form.endDate) {
        return ApiResponse.badRequest("This feedback form is not currently available").send(res);
      }
    }

    // Check if feedback already exists
    const existing = await Feedback.findOne({
      studentId: req.userId,
      facultyId,
      subjectId,
      semester,
    });

    if (existing) {
      return ApiResponse.conflict("You have already submitted feedback for this faculty and subject").send(res);
    }

    // Create feedback
    const feedbackData = {
      studentId: req.userId,
      facultyId,
      subjectId,
      branchId,
      semester,
      teachingQuality,
      knowledgeOfSubject,
      communication,
      punctuality,
      overallRating,
      strengths: strengths || "",
      improvements: improvements || "",
      additionalComments: additionalComments || "",
      isAnonymous: isAnonymous || false,
    };

    if (feedbackFormId) {
      feedbackData.feedbackFormId = feedbackFormId;
    }

    const feedback = await Feedback.create(feedbackData);

    return ApiResponse.created(feedback, "Feedback submitted successfully").send(res);
  } catch (error) {
    console.error("Submit Feedback Error:", error);
    return ApiResponse.internalServerError().send(res);
  }
};

// Get My Submitted Feedback (Student)
const getMyFeedbackController = async (req, res) => {
  try {
    const studentId = req.userId;
    const { semester, subjectId } = req.query;

    const query = { studentId };

    if (semester) query.semester = semester;
    if (subjectId) query.subjectId = subjectId;

    const feedback = await Feedback.find(query)
      .populate("facultyId", "firstName lastName employeeId")
      .populate("subjectId", "name code")
      .populate("branchId", "name")
      .sort({ createdAt: -1 });

    return ApiResponse.success(feedback, "Feedback fetched successfully").send(res);
  } catch (error) {
    console.error("Get My Feedback Error:", error);
    return ApiResponse.internalServerError().send(res);
  }
};

// Get Feedback for Faculty (Faculty)
const getFacultyFeedbackController = async (req, res) => {
  try {
    const facultyId = req.userId;
    const { semester, subjectId, includeAnonymous } = req.query;

    const query = { facultyId };

    if (semester) query.semester = semester;
    if (subjectId) query.subjectId = subjectId;

    const feedback = await Feedback.find(query)
      .populate("subjectId", "name code")
      .populate("branchId", "name")
      .sort({ createdAt: -1 });

    // Filter based on anonymous preference
    const filteredFeedback = feedback.map((item) => {
      if (item.isAnonymous && includeAnonymous !== "true") {
        // Hide student details for anonymous feedback
        return {
          ...item.toObject(),
          studentId: null,
        };
      }
      return item;
    });

    // Calculate average ratings
    const totalFeedback = feedback.length;
    const avgTeachingQuality = feedback.reduce((sum, f) => sum + f.teachingQuality, 0) / totalFeedback || 0;
    const avgKnowledgeOfSubject = feedback.reduce((sum, f) => sum + f.knowledgeOfSubject, 0) / totalFeedback || 0;
    const avgCommunication = feedback.reduce((sum, f) => sum + f.communication, 0) / totalFeedback || 0;
    const avgPunctuality = feedback.reduce((sum, f) => sum + f.punctuality, 0) / totalFeedback || 0;
    const avgOverallRating = feedback.reduce((sum, f) => sum + f.overallRating, 0) / totalFeedback || 0;

    return ApiResponse.success(
      {
        feedback: filteredFeedback,
        statistics: {
          totalFeedback,
          averageRatings: {
            teachingQuality: avgTeachingQuality.toFixed(2),
            knowledgeOfSubject: avgKnowledgeOfSubject.toFixed(2),
            communication: avgCommunication.toFixed(2),
            punctuality: avgPunctuality.toFixed(2),
            overallRating: avgOverallRating.toFixed(2),
          },
        },
      },
      "Feedback fetched successfully"
    ).send(res);
  } catch (error) {
    console.error("Get Faculty Feedback Error:", error);
    return ApiResponse.internalServerError().send(res);
  }
};

// Get All Feedback (Admin)
const getAllFeedbackController = async (req, res) => {
  try {
    const { facultyId, semester, subjectId, branchId } = req.query;

    const query = {};

    if (facultyId) query.facultyId = facultyId;
    if (semester) query.semester = semester;
    if (subjectId) query.subjectId = subjectId;
    if (branchId) query.branchId = branchId;

    const feedback = await Feedback.find(query)
      .populate("studentId", "firstName middleName lastName enrollmentNo")
      .populate("facultyId", "firstName lastName employeeId")
      .populate("subjectId", "name code")
      .populate("branchId", "name")
      .sort({ createdAt: -1 });

    return ApiResponse.success(feedback, "All feedback fetched successfully").send(res);
  } catch (error) {
    console.error("Get All Feedback Error:", error);
    return ApiResponse.internalServerError().send(res);
  }
};

// Get Feedback Summary by Faculty (Admin)
const getFeedbackSummaryController = async (req, res) => {
  try {
    const { facultyId } = req.params;
    const { semester } = req.query;

    const query = { facultyId };
    if (semester) query.semester = semester;

    const feedback = await Feedback.find(query);

    if (feedback.length === 0) {
      return ApiResponse.success(
        {
          facultyId,
          totalFeedback: 0,
          averageRatings: null,
        },
        "No feedback found"
      ).send(res);
    }

    // Calculate statistics
    const totalFeedback = feedback.length;
    const avgTeachingQuality = feedback.reduce((sum, f) => sum + f.teachingQuality, 0) / totalFeedback;
    const avgKnowledgeOfSubject = feedback.reduce((sum, f) => sum + f.knowledgeOfSubject, 0) / totalFeedback;
    const avgCommunication = feedback.reduce((sum, f) => sum + f.communication, 0) / totalFeedback;
    const avgPunctuality = feedback.reduce((sum, f) => sum + f.punctuality, 0) / totalFeedback;
    const avgOverallRating = feedback.reduce((sum, f) => sum + f.overallRating, 0) / totalFeedback;

    // Get subject-wise breakdown
    const subjectWise = {};
    feedback.forEach((item) => {
      const subjectId = item.subjectId.toString();
      if (!subjectWise[subjectId]) {
        subjectWise[subjectId] = {
          count: 0,
          totalOverallRating: 0,
        };
      }
      subjectWise[subjectId].count++;
      subjectWise[subjectId].totalOverallRating += item.overallRating;
    });

    Object.keys(subjectWise).forEach((key) => {
      const stats = subjectWise[key];
      stats.averageRating = (stats.totalOverallRating / stats.count).toFixed(2);
    });

    return ApiResponse.success(
      {
        facultyId,
        totalFeedback,
        averageRatings: {
          teachingQuality: avgTeachingQuality.toFixed(2),
          knowledgeOfSubject: avgKnowledgeOfSubject.toFixed(2),
          communication: avgCommunication.toFixed(2),
          punctuality: avgPunctuality.toFixed(2),
          overallRating: avgOverallRating.toFixed(2),
        },
        subjectWiseBreakdown: subjectWise,
      },
      "Feedback summary generated successfully"
    ).send(res);
  } catch (error) {
    console.error("Get Feedback Summary Error:", error);
    return ApiResponse.internalServerError().send(res);
  }
};

// Update Feedback Status (Admin)
const updateFeedbackStatusController = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!["submitted", "reviewed", "archived"].includes(status)) {
      return ApiResponse.badRequest("Invalid status").send(res);
    }

    const feedback = await Feedback.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!feedback) {
      return ApiResponse.notFound("Feedback not found").send(res);
    }

    return ApiResponse.success(feedback, "Feedback status updated successfully").send(res);
  } catch (error) {
    console.error("Update Feedback Status Error:", error);
    return ApiResponse.internalServerError().send(res);
  }
};

// Delete Feedback (Admin)
const deleteFeedbackController = async (req, res) => {
  try {
    const { id } = req.params;

    const feedback = await Feedback.findByIdAndDelete(id);

    if (!feedback) {
      return ApiResponse.notFound("Feedback not found").send(res);
    }

    return ApiResponse.success(null, "Feedback deleted successfully").send(res);
  } catch (error) {
    console.error("Delete Feedback Error:", error);
    return ApiResponse.internalServerError().send(res);
  }
};

module.exports = {
  submitFeedbackController,
  getMyFeedbackController,
  getFacultyFeedbackController,
  getAllFeedbackController,
  getFeedbackSummaryController,
  updateFeedbackStatusController,
  deleteFeedbackController,
};
