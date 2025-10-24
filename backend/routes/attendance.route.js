const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth.middleware");
const {
  markAttendanceController,
  getAttendanceBySubjectController,
  getStudentAttendanceController,
  getMyAttendanceController,
  getAttendanceReportController,
  deleteAttendanceController,
} = require("../controllers/attendance.controller");

// Faculty Routes
router.post("/mark", authMiddleware, markAttendanceController);
router.get("/subject", authMiddleware, getAttendanceBySubjectController);

// Student Routes
router.get("/my-attendance", authMiddleware, getMyAttendanceController);

// Admin/Faculty Routes
router.get("/student/:studentId", authMiddleware, getStudentAttendanceController);
router.get("/report", authMiddleware, getAttendanceReportController);
router.delete("/:id", authMiddleware, deleteAttendanceController);

module.exports = router;
