const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth.middleware");
const adminOnly = require("../middlewares/admin-only.middleware");
const {
  submitFeedbackController,
  getMyFeedbackController,
  getAllFeedbackController,
  getFeedbackSummaryController,
  updateFeedbackStatusController,
  deleteFeedbackController,
} = require("../controllers/feedback.controller");

// Student Routes
router.post("/submit", authMiddleware, submitFeedbackController);
router.get("/my-feedback", authMiddleware, getMyFeedbackController);

// Admin Routes (Faculty CANNOT view their own feedback)
router.get("/all", authMiddleware, adminOnly, getAllFeedbackController);
router.get("/summary/:facultyId", authMiddleware, adminOnly, getFeedbackSummaryController);
router.put("/status/:id", authMiddleware, adminOnly, updateFeedbackStatusController);
router.delete("/:id", authMiddleware, adminOnly, deleteFeedbackController);

module.exports = router;
