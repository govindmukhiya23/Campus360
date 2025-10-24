const Attendance = require("../models/attendance.model");
const ApiResponse = require("../utils/ApiResponse");

// Mark Attendance (Faculty)
const markAttendanceController = async (req, res) => {
  try {
    const { attendanceData } = req.body; // Array of student attendance records

    if (!attendanceData || !Array.isArray(attendanceData) || attendanceData.length === 0) {
      return ApiResponse.badRequest("Attendance data is required").send(res);
    }

    const results = [];
    const errors = [];

    for (const record of attendanceData) {
      try {
        const { studentId, subjectId, branchId, semester, date, status, remarks } = record;

        // Check if attendance already marked for this student, subject, and date
        const existing = await Attendance.findOne({
          studentId,
          subjectId,
          date: new Date(date),
        });

        if (existing) {
          // Update existing attendance
          existing.status = status;
          existing.remarks = remarks || "";
          existing.semester = semester;
          existing.branchId = branchId;
          existing.facultyId = req.userId;
          existing.markedBy = req.userId;
          await existing.save();
          results.push(existing);
        } else {
          // Create new attendance record
          const attendance = await Attendance.create({
            studentId,
            subjectId,
            branchId,
            facultyId: req.userId,
            semester,
            date: new Date(date),
            status,
            remarks: remarks || "",
            markedBy: req.userId,
          });
          results.push(attendance);
        }
      } catch (error) {
        errors.push({ record, error: error.message });
      }
    }

    if (errors.length > 0 && results.length === 0) {
      return ApiResponse.badRequest("Failed to mark attendance", errors).send(res);
    }

    return ApiResponse.success(
      { marked: results, errors },
      `Attendance marked successfully for ${results.length} student(s)`
    ).send(res);
  } catch (error) {
    console.error("Mark Attendance Error:", error);
    return ApiResponse.internalServerError().send(res);
  }
};

// Get Attendance by Subject (Faculty)
const getAttendanceBySubjectController = async (req, res) => {
  try {
    const { subjectId, semester, date } = req.query;

    if (!subjectId) {
      return ApiResponse.badRequest("Subject ID is required").send(res);
    }

    const query = { subjectId };

    if (semester) query.semester = semester;
    if (date) query.date = new Date(date);

    const attendance = await Attendance.find(query)
      .populate("studentId", "firstName middleName lastName enrollmentNo")
      .populate("subjectId", "name code")
      .populate("branchId", "name")
      .sort({ date: -1, studentId: 1 });

    return ApiResponse.success(attendance, "Attendance fetched successfully").send(res);
  } catch (error) {
    console.error("Get Attendance Error:", error);
    return ApiResponse.internalServerError().send(res);
  }
};

// Get Student Attendance (Student/Faculty)
const getStudentAttendanceController = async (req, res) => {
  try {
    const { studentId } = req.params;
    const { subjectId, semester, startDate, endDate } = req.query;

    const query = { studentId };

    if (subjectId) query.subjectId = subjectId;
    if (semester) query.semester = semester;
    if (startDate || endDate) {
      query.date = {};
      if (startDate) query.date.$gte = new Date(startDate);
      if (endDate) query.date.$lte = new Date(endDate);
    }

    const attendance = await Attendance.find(query)
      .populate("subjectId", "name code")
      .populate("facultyId", "firstName lastName")
      .sort({ date: -1 });

    // Calculate statistics
    const total = attendance.length;
    const present = attendance.filter((a) => a.status === "present").length;
    const absent = attendance.filter((a) => a.status === "absent").length;
    const late = attendance.filter((a) => a.status === "late").length;
    const excused = attendance.filter((a) => a.status === "excused").length;
    const percentage = total > 0 ? ((present + late) / total) * 100 : 0;

    return ApiResponse.success(
      {
        attendance,
        statistics: {
          total,
          present,
          absent,
          late,
          excused,
          percentage: percentage.toFixed(2),
        },
      },
      "Student attendance fetched successfully"
    ).send(res);
  } catch (error) {
    console.error("Get Student Attendance Error:", error);
    return ApiResponse.internalServerError().send(res);
  }
};

// Get My Attendance (Student)
const getMyAttendanceController = async (req, res) => {
  try {
    const studentId = req.userId;
    const { subjectId, semester, startDate, endDate } = req.query;

    const query = { studentId };

    if (subjectId) query.subjectId = subjectId;
    if (semester) query.semester = semester;
    if (startDate || endDate) {
      query.date = {};
      if (startDate) query.date.$gte = new Date(startDate);
      if (endDate) query.date.$lte = new Date(endDate);
    }

    const attendance = await Attendance.find(query)
      .populate("subjectId", "name code")
      .populate("facultyId", "firstName lastName")
      .sort({ date: -1 });

    // Calculate statistics by subject
    const subjectWiseStats = {};
    
    attendance.forEach((record) => {
      const subjectId = record.subjectId._id.toString();
      const subjectName = record.subjectId.name;

      if (!subjectWiseStats[subjectId]) {
        subjectWiseStats[subjectId] = {
          subjectName,
          total: 0,
          present: 0,
          absent: 0,
          late: 0,
          excused: 0,
        };
      }

      subjectWiseStats[subjectId].total++;
      if (record.status === "present") subjectWiseStats[subjectId].present++;
      if (record.status === "absent") subjectWiseStats[subjectId].absent++;
      if (record.status === "late") subjectWiseStats[subjectId].late++;
      if (record.status === "excused") subjectWiseStats[subjectId].excused++;
    });

    // Calculate percentages
    Object.keys(subjectWiseStats).forEach((key) => {
      const stats = subjectWiseStats[key];
      stats.percentage = stats.total > 0 
        ? (((stats.present + stats.late) / stats.total) * 100).toFixed(2)
        : 0;
    });

    // Overall statistics
    const total = attendance.length;
    const present = attendance.filter((a) => a.status === "present").length;
    const absent = attendance.filter((a) => a.status === "absent").length;
    const late = attendance.filter((a) => a.status === "late").length;
    const excused = attendance.filter((a) => a.status === "excused").length;
    const overallPercentage = total > 0 ? ((present + late) / total) * 100 : 0;

    return ApiResponse.success(
      {
        attendance,
        subjectWiseStats: Object.values(subjectWiseStats),
        overallStatistics: {
          total,
          present,
          absent,
          late,
          excused,
          percentage: overallPercentage.toFixed(2),
        },
      },
      "Attendance fetched successfully"
    ).send(res);
  } catch (error) {
    console.error("Get My Attendance Error:", error);
    return ApiResponse.internalServerError().send(res);
  }
};

// Get Attendance Report (Admin/Faculty)
const getAttendanceReportController = async (req, res) => {
  try {
    const { branchId, semester, subjectId, startDate, endDate } = req.query;

    const query = {};

    if (branchId) query.branchId = branchId;
    if (semester) query.semester = semester;
    if (subjectId) query.subjectId = subjectId;
    if (startDate || endDate) {
      query.date = {};
      if (startDate) query.date.$gte = new Date(startDate);
      if (endDate) query.date.$lte = new Date(endDate);
    }

    const attendance = await Attendance.find(query)
      .populate("studentId", "firstName middleName lastName enrollmentNo")
      .populate("subjectId", "name code")
      .populate("branchId", "name")
      .populate("facultyId", "firstName lastName")
      .sort({ date: -1 });

    return ApiResponse.success(attendance, "Attendance report generated successfully").send(res);
  } catch (error) {
    console.error("Get Attendance Report Error:", error);
    return ApiResponse.internalServerError().send(res);
  }
};

// Delete Attendance (Admin/Faculty)
const deleteAttendanceController = async (req, res) => {
  try {
    const { id } = req.params;

    const attendance = await Attendance.findByIdAndDelete(id);

    if (!attendance) {
      return ApiResponse.notFound("Attendance record not found").send(res);
    }

    return ApiResponse.success(null, "Attendance deleted successfully").send(res);
  } catch (error) {
    console.error("Delete Attendance Error:", error);
    return ApiResponse.internalServerError().send(res);
  }
};

module.exports = {
  markAttendanceController,
  getAttendanceBySubjectController,
  getStudentAttendanceController,
  getMyAttendanceController,
  getAttendanceReportController,
  deleteAttendanceController,
};
