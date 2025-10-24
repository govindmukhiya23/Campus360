# Attendance & Feedback API Documentation

## 🎯 New Features Added

### 1. Attendance Management System
### 2. Feedback System

---

## 📚 ATTENDANCE API ENDPOINTS

### Base URL: `/api/attendance`

---

### 1. Mark Attendance (Faculty)
**POST** `/api/attendance/mark`

**Headers:**
```json
{
  "Authorization": "Bearer <faculty_token>"
}
```

**Request Body:**
```json
{
  "attendanceData": [
    {
      "studentId": "60d5ec49f1b2c8b1f8e4e1a1",
      "subjectId": "60d5ec49f1b2c8b1f8e4e1a2",
      "branchId": "60d5ec49f1b2c8b1f8e4e1a3",
      "semester": 3,
      "date": "2025-10-24",
      "status": "present",
      "remarks": "On time"
    },
    {
      "studentId": "60d5ec49f1b2c8b1f8e4e1a4",
      "subjectId": "60d5ec49f1b2c8b1f8e4e1a2",
      "branchId": "60d5ec49f1b2c8b1f8e4e1a3",
      "semester": 3,
      "date": "2025-10-24",
      "status": "absent",
      "remarks": ""
    }
  ]
}
```

**Status Values:** `present`, `absent`, `late`, `excused`

---

### 2. Get Attendance by Subject (Faculty)
**GET** `/api/attendance/subject?subjectId=<id>&semester=<num>&date=<date>`

**Headers:**
```json
{
  "Authorization": "Bearer <faculty_token>"
}
```

**Query Parameters:**
- `subjectId` (required): Subject ID
- `semester` (optional): Semester number
- `date` (optional): Specific date (YYYY-MM-DD)

---

### 3. Get My Attendance (Student)
**GET** `/api/attendance/my-attendance?subjectId=<id>&semester=<num>&startDate=<date>&endDate=<date>`

**Headers:**
```json
{
  "Authorization": "Bearer <student_token>"
}
```

**Query Parameters:**
- `subjectId` (optional): Filter by subject
- `semester` (optional): Filter by semester
- `startDate` (optional): Start date (YYYY-MM-DD)
- `endDate` (optional): End date (YYYY-MM-DD)

**Response:**
```json
{
  "success": true,
  "data": {
    "attendance": [...],
    "subjectWiseStats": [
      {
        "subjectName": "Data Structures",
        "total": 20,
        "present": 18,
        "absent": 2,
        "late": 0,
        "excused": 0,
        "percentage": "90.00"
      }
    ],
    "overallStatistics": {
      "total": 50,
      "present": 45,
      "absent": 3,
      "late": 2,
      "excused": 0,
      "percentage": "94.00"
    }
  }
}
```

---

### 4. Get Student Attendance (Faculty/Admin)
**GET** `/api/attendance/student/:studentId?subjectId=<id>&semester=<num>&startDate=<date>&endDate=<date>`

**Headers:**
```json
{
  "Authorization": "Bearer <token>"
}
```

---

### 5. Get Attendance Report (Admin/Faculty)
**GET** `/api/attendance/report?branchId=<id>&semester=<num>&subjectId=<id>&startDate=<date>&endDate=<date>`

**Headers:**
```json
{
  "Authorization": "Bearer <token>"
}
```

**Query Parameters:**
- `branchId` (optional): Filter by branch
- `semester` (optional): Filter by semester
- `subjectId` (optional): Filter by subject
- `startDate` (optional): Start date
- `endDate` (optional): End date

---

### 6. Delete Attendance (Admin/Faculty)
**DELETE** `/api/attendance/:id`

**Headers:**
```json
{
  "Authorization": "Bearer <token>"
}
```

---

## 💬 FEEDBACK API ENDPOINTS

### Base URL: `/api/feedback`

---

### 1. Submit Feedback (Student)
**POST** `/api/feedback/submit`

**Headers:**
```json
{
  "Authorization": "Bearer <student_token>"
}
```

**Request Body:**
```json
{
  "facultyId": "60d5ec49f1b2c8b1f8e4e1a1",
  "subjectId": "60d5ec49f1b2c8b1f8e4e1a2",
  "branchId": "60d5ec49f1b2c8b1f8e4e1a3",
  "semester": 3,
  "teachingQuality": 5,
  "knowledgeOfSubject": 5,
  "communication": 4,
  "punctuality": 5,
  "overallRating": 5,
  "strengths": "Excellent teaching methods and clear explanations",
  "improvements": "Could provide more practical examples",
  "additionalComments": "Great professor overall",
  "isAnonymous": false
}
```

**Rating Scale:** 1-5 (1 = Poor, 5 = Excellent)

**Note:** Students can submit only one feedback per faculty per subject per semester.

---

### 2. Get My Submitted Feedback (Student)
**GET** `/api/feedback/my-feedback?semester=<num>&subjectId=<id>`

**Headers:**
```json
{
  "Authorization": "Bearer <student_token>"
}
```

**Query Parameters:**
- `semester` (optional): Filter by semester
- `subjectId` (optional): Filter by subject

---

### 3. Get Faculty Feedback (Faculty)
**GET** `/api/feedback/faculty-feedback?semester=<num>&subjectId=<id>&includeAnonymous=<true/false>`

**Headers:**
```json
{
  "Authorization": "Bearer <faculty_token>"
}
```

**Query Parameters:**
- `semester` (optional): Filter by semester
- `subjectId` (optional): Filter by subject
- `includeAnonymous` (optional): Show student details for anonymous feedback

**Response:**
```json
{
  "success": true,
  "data": {
    "feedback": [...],
    "statistics": {
      "totalFeedback": 25,
      "averageRatings": {
        "teachingQuality": "4.50",
        "knowledgeOfSubject": "4.80",
        "communication": "4.30",
        "punctuality": "4.70",
        "overallRating": "4.60"
      }
    }
  }
}
```

---

### 4. Get All Feedback (Admin)
**GET** `/api/feedback/all?facultyId=<id>&semester=<num>&subjectId=<id>&branchId=<id>`

**Headers:**
```json
{
  "Authorization": "Bearer <admin_token>"
}
```

**Query Parameters:**
- `facultyId` (optional): Filter by faculty
- `semester` (optional): Filter by semester
- `subjectId` (optional): Filter by subject
- `branchId` (optional): Filter by branch

---

### 5. Get Feedback Summary by Faculty (Admin)
**GET** `/api/feedback/summary/:facultyId?semester=<num>`

**Headers:**
```json
{
  "Authorization": "Bearer <admin_token>"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "facultyId": "60d5ec49f1b2c8b1f8e4e1a1",
    "totalFeedback": 50,
    "averageRatings": {
      "teachingQuality": "4.50",
      "knowledgeOfSubject": "4.80",
      "communication": "4.30",
      "punctuality": "4.70",
      "overallRating": "4.60"
    },
    "subjectWiseBreakdown": {
      "60d5ec49f1b2c8b1f8e4e1a2": {
        "count": 25,
        "totalOverallRating": 115,
        "averageRating": "4.60"
      }
    }
  }
}
```

---

### 6. Update Feedback Status (Admin)
**PUT** `/api/feedback/status/:id`

**Headers:**
```json
{
  "Authorization": "Bearer <admin_token>"
}
```

**Request Body:**
```json
{
  "status": "reviewed"
}
```

**Status Values:** `submitted`, `reviewed`, `archived`

---

### 7. Delete Feedback (Admin)
**DELETE** `/api/feedback/:id`

**Headers:**
```json
{
  "Authorization": "Bearer <admin_token>"
}
```

---

## 📊 Database Models

### Attendance Model
```javascript
{
  studentId: ObjectId (ref: StudentDetail),
  subjectId: ObjectId (ref: Subject),
  branchId: ObjectId (ref: Branch),
  facultyId: ObjectId (ref: FacultyDetail),
  semester: Number,
  date: Date,
  status: String (present/absent/late/excused),
  remarks: String,
  markedBy: ObjectId (ref: FacultyDetail),
  createdAt: Date,
  updatedAt: Date
}
```

### Feedback Model
```javascript
{
  studentId: ObjectId (ref: StudentDetail),
  facultyId: ObjectId (ref: FacultyDetail),
  subjectId: ObjectId (ref: Subject),
  branchId: ObjectId (ref: Branch),
  semester: Number,
  teachingQuality: Number (1-5),
  knowledgeOfSubject: Number (1-5),
  communication: Number (1-5),
  punctuality: Number (1-5),
  overallRating: Number (1-5),
  strengths: String,
  improvements: String,
  additionalComments: String,
  isAnonymous: Boolean,
  status: String (submitted/reviewed/archived),
  createdAt: Date,
  updatedAt: Date
}
```

---

## 🔐 Authentication

All endpoints require authentication using JWT token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

---

## ✨ Features

### Attendance System:
- ✅ Mark attendance for multiple students at once
- ✅ Update existing attendance records
- ✅ View attendance by subject, semester, date
- ✅ Calculate attendance percentage
- ✅ Subject-wise attendance statistics
- ✅ Overall attendance statistics
- ✅ Prevent duplicate attendance entries

### Feedback System:
- ✅ Multi-criteria rating system (5 categories)
- ✅ Anonymous feedback option
- ✅ Text-based feedback (strengths, improvements, comments)
- ✅ One feedback per student per faculty per subject per semester
- ✅ Average ratings calculation
- ✅ Subject-wise feedback breakdown
- ✅ Faculty performance summary
- ✅ Feedback status management (submitted/reviewed/archived)

---

## 🚀 Usage Examples

### Example 1: Mark Attendance for a Class
```javascript
// Faculty marks attendance for entire class
POST /api/attendance/mark
{
  "attendanceData": [
    {
      "studentId": "673a1b2c3d4e5f6g7h8i9j0k",
      "subjectId": "673a1b2c3d4e5f6g7h8i9j0l",
      "branchId": "673a1b2c3d4e5f6g7h8i9j0m",
      "semester": 5,
      "date": "2025-10-24",
      "status": "present"
    }
    // ... more students
  ]
}
```

### Example 2: Student Submits Feedback
```javascript
// Student provides feedback for a faculty
POST /api/feedback/submit
{
  "facultyId": "673a1b2c3d4e5f6g7h8i9j0n",
  "subjectId": "673a1b2c3d4e5f6g7h8i9j0l",
  "branchId": "673a1b2c3d4e5f6g7h8i9j0m",
  "semester": 5,
  "teachingQuality": 5,
  "knowledgeOfSubject": 5,
  "communication": 4,
  "punctuality": 5,
  "overallRating": 5,
  "strengths": "Very knowledgeable and helpful",
  "improvements": "Could provide more study materials",
  "isAnonymous": false
}
```

### Example 3: View My Attendance
```javascript
// Student checks their attendance
GET /api/attendance/my-attendance?semester=5

// Response includes:
// - All attendance records
// - Subject-wise statistics
// - Overall attendance percentage
```

---

## 📝 Notes

1. **Attendance**: 
   - Faculty can mark or update attendance
   - Students can only view their own attendance
   - Admin can view all attendance records

2. **Feedback**:
   - Students can submit feedback once per faculty per subject per semester
   - Faculty can view their own feedback (with anonymity respected)
   - Admin can view all feedback and generate reports

3. **Authentication**:
   - All routes require valid JWT authentication
   - Role-based access control is implemented

---

## 🎉 Ready to Use!

Both features are now fully implemented and integrated into your College Management System!
