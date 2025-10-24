const mongoose = require("mongoose");

const feedbackFormSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
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
      min: 1,
      max: 8,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    allowAnonymous: {
      type: Boolean,
      default: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "AdminDetail",
      required: true,
    },
  },
  { timestamps: true }
);

// Index for querying
feedbackFormSchema.index({ branchId: 1, semester: 1, isActive: 1 });
feedbackFormSchema.index({ facultyId: 1, subjectId: 1 });
feedbackFormSchema.index({ endDate: 1 });

module.exports = mongoose.model("FeedbackForm", feedbackFormSchema);
