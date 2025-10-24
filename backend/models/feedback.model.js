const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema(
  {
    feedbackFormId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "FeedbackForm",
    },
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "StudentDetail",
      required: true,
    },
    facultyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "FacultyDetail",
      required: true,
    },
    subjectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subject",
      required: true,
    },
    branchId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Branch",
      required: true,
    },
    semester: {
      type: Number,
      required: true,
    },
    // Rating fields (1-5 scale)
    teachingQuality: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    knowledgeOfSubject: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    communication: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    punctuality: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    overallRating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    // Text feedback
    strengths: {
      type: String,
      default: "",
    },
    improvements: {
      type: String,
      default: "",
    },
    additionalComments: {
      type: String,
      default: "",
    },
    // Anonymous feedback option
    isAnonymous: {
      type: Boolean,
      default: false,
    },
    // Status
    status: {
      type: String,
      enum: ["submitted", "reviewed", "archived"],
      default: "submitted",
    },
  },
  { timestamps: true }
);

// Create compound index to allow only one feedback per student per subject per semester
feedbackSchema.index({ studentId: 1, facultyId: 1, subjectId: 1, semester: 1 }, { unique: true });

const Feedback = mongoose.model("Feedback", feedbackSchema);

module.exports = Feedback;
