const FeedbackForm = require("../models/feedback-form.model");
const ApiResponse = require("../utils/ApiResponse");

// Create Feedback Form (Admin)
const createFeedbackFormController = async (req, res) => {
  try {
    const {
      title,
      description,
      facultyId,
      subjectId,
      branchId,
      semester,
      startDate,
      endDate,
      allowAnonymous,
    } = req.body;

    // Validate required fields
    if (!title || !facultyId || !subjectId || !branchId || !semester || !startDate || !endDate) {
      return ApiResponse.badRequest("All required fields must be provided").send(res);
    }

    // Validate dates
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    if (end <= start) {
      return ApiResponse.badRequest("End date must be after start date").send(res);
    }

    // Check if form already exists for this faculty-subject-semester combination
    const existingForm = await FeedbackForm.findOne({
      facultyId,
      subjectId,
      semester,
      isActive: true,
    });

    if (existingForm) {
      return ApiResponse.conflict(
        "An active feedback form already exists for this faculty, subject, and semester"
      ).send(res);
    }

    // Create feedback form
    const feedbackForm = await FeedbackForm.create({
      title,
      description: description || "",
      facultyId,
      subjectId,
      branchId,
      semester,
      startDate: start,
      endDate: end,
      allowAnonymous: allowAnonymous !== undefined ? allowAnonymous : true,
      createdBy: req.userId,
    });

    const populatedForm = await FeedbackForm.findById(feedbackForm._id)
      .populate("facultyId", "firstName lastName employeeId")
      .populate("subjectId", "name code")
      .populate("branchId", "name");

    return ApiResponse.created(populatedForm, "Feedback form created successfully").send(res);
  } catch (error) {
    console.error("Create Feedback Form Error:", error);
    return ApiResponse.internalServerError().send(res);
  }
};

// Get All Feedback Forms (Admin)
const getAllFeedbackFormsController = async (req, res) => {
  try {
    const { isActive, branchId, semester, facultyId } = req.query;

    const query = {};
    if (isActive !== undefined) query.isActive = isActive === "true";
    if (branchId) query.branchId = branchId;
    if (semester) query.semester = semester;
    if (facultyId) query.facultyId = facultyId;

    const forms = await FeedbackForm.find(query)
      .populate("facultyId", "firstName lastName employeeId")
      .populate("subjectId", "name code")
      .populate("branchId", "name")
      .populate("createdBy", "firstName lastName")
      .sort({ createdAt: -1 });

    return ApiResponse.success(forms, "Feedback forms fetched successfully").send(res);
  } catch (error) {
    console.error("Get All Feedback Forms Error:", error);
    return ApiResponse.internalServerError().send(res);
  }
};

// Get Available Forms for Student
const getAvailableFormsController = async (req, res) => {
  try {
    const StudentDetail = require("../models/details/student-details.model");
    const student = await StudentDetail.findById(req.userId);

    if (!student) {
      return ApiResponse.notFound("Student not found").send(res);
    }

    const now = new Date();

    // Get active forms for student's branch and semester
    const forms = await FeedbackForm.find({
      branchId: student.branchId,
      semester: student.semester,
      isActive: true,
      startDate: { $lte: now },
      endDate: { $gte: now },
    })
      .populate("facultyId", "firstName lastName employeeId")
      .populate("subjectId", "name code")
      .populate("branchId", "name")
      .sort({ endDate: 1 });

    // Check which forms the student has already submitted
    const Feedback = require("../models/feedback.model");
    const formsWithStatus = await Promise.all(
      forms.map(async (form) => {
        const submitted = await Feedback.findOne({
          studentId: req.userId,
          facultyId: form.facultyId._id,
          subjectId: form.subjectId._id,
          semester: form.semester,
        });

        return {
          ...form.toObject(),
          hasSubmitted: !!submitted,
        };
      })
    );

    return ApiResponse.success(formsWithStatus, "Available feedback forms fetched successfully").send(res);
  } catch (error) {
    console.error("Get Available Forms Error:", error);
    return ApiResponse.internalServerError().send(res);
  }
};

// Update Feedback Form (Admin)
const updateFeedbackFormController = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = { ...req.body };

    // Validate dates if provided
    if (updateData.startDate && updateData.endDate) {
      const start = new Date(updateData.startDate);
      const end = new Date(updateData.endDate);
      
      if (end <= start) {
        return ApiResponse.badRequest("End date must be after start date").send(res);
      }
    }

    const updatedForm = await FeedbackForm.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    )
      .populate("facultyId", "firstName lastName employeeId")
      .populate("subjectId", "name code")
      .populate("branchId", "name");

    if (!updatedForm) {
      return ApiResponse.notFound("Feedback form not found").send(res);
    }

    return ApiResponse.success(updatedForm, "Feedback form updated successfully").send(res);
  } catch (error) {
    console.error("Update Feedback Form Error:", error);
    return ApiResponse.internalServerError().send(res);
  }
};

// Delete Feedback Form (Admin)
const deleteFeedbackFormController = async (req, res) => {
  try {
    const { id } = req.params;

    const form = await FeedbackForm.findByIdAndDelete(id);

    if (!form) {
      return ApiResponse.notFound("Feedback form not found").send(res);
    }

    return ApiResponse.success(null, "Feedback form deleted successfully").send(res);
  } catch (error) {
    console.error("Delete Feedback Form Error:", error);
    return ApiResponse.internalServerError().send(res);
  }
};

// Toggle Form Status (Admin)
const toggleFormStatusController = async (req, res) => {
  try {
    const { id } = req.params;

    const form = await FeedbackForm.findById(id);
    if (!form) {
      return ApiResponse.notFound("Feedback form not found").send(res);
    }

    form.isActive = !form.isActive;
    await form.save();

    return ApiResponse.success(
      form,
      `Feedback form ${form.isActive ? "activated" : "deactivated"} successfully`
    ).send(res);
  } catch (error) {
    console.error("Toggle Form Status Error:", error);
    return ApiResponse.internalServerError().send(res);
  }
};

module.exports = {
  createFeedbackFormController,
  getAllFeedbackFormsController,
  getAvailableFormsController,
  updateFeedbackFormController,
  deleteFeedbackFormController,
  toggleFormStatusController,
};
