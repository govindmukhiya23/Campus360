const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth.middleware");
const adminOnly = require("../middlewares/admin-only.middleware");
const {
  createFeedbackFormController,
  getAllFeedbackFormsController,
  getAvailableFormsController,
  updateFeedbackFormController,
  deleteFeedbackFormController,
  toggleFormStatusController,
} = require("../controllers/feedback-form.controller");

// Admin Routes - Manage Feedback Forms
router.post("/create", authMiddleware, adminOnly, createFeedbackFormController);
router.get("/all", authMiddleware, adminOnly, getAllFeedbackFormsController);
router.put("/:id", authMiddleware, adminOnly, updateFeedbackFormController);
router.delete("/:id", authMiddleware, adminOnly, deleteFeedbackFormController);
router.patch("/:id/toggle", authMiddleware, adminOnly, toggleFormStatusController);

// Student Routes - View Available Forms
router.get("/available", authMiddleware, getAvailableFormsController);

module.exports = router;
