# Feedback Form System - Workflow

## Overview
The feedback system now uses a **Form-Based Workflow** where admins create feedback forms and students fill them out.

---

## Workflow

### 1. Admin Creates Feedback Form
**Admin Dashboard → Feedback Forms**

**Steps:**
1. Click "Create New Form"
2. Fill in form details:
   - **Title**: e.g., "Mid-Semester Faculty Feedback"
   - **Description**: Optional context
   - **Branch**: Select branch
   - **Semester**: 1-8
   - **Subject**: Select subject
   - **Faculty**: Select faculty to be evaluated
   - **Start Date**: When form becomes available
   - **End Date**: Submission deadline
   - **Allow Anonymous**: Enable/disable anonymous feedback
3. Click "Create Form"

**Form Status:**
- **Active**: Students can see and submit
- **Inactive**: Hidden from students
- Toggle status anytime
- Delete forms if needed

---

### 2. Student Fills Feedback
**Student Dashboard → Feedback**

**What Students See:**
- List of **available feedback forms** for their branch/semester
- Forms are active only between start and end dates
- Clear indication of already submitted forms (✓ Submitted)

**Steps:**
1. View available feedback forms
2. Click "Fill Feedback" on a form
3. Rate faculty on 5 parameters (1-5 stars):
   - Teaching Quality
   - Knowledge of Subject
   - Communication Skills
   - Punctuality
   - Overall Rating
4. Provide text feedback (optional):
   - Strengths
   - Areas for Improvement
   - Additional Comments
5. Choose anonymous option (if allowed by admin)
6. Submit

**Restrictions:**
- Can submit only once per form
- Cannot edit after submission
- Form pre-fills faculty and subject (no manual selection needed)

---

### 3. Admin Views Feedback Results
**Admin Dashboard → View Feedback**

**Features:**
- View all submitted feedback
- Filter by faculty, branch, subject, semester
- See faculty performance summaries
- Average ratings across all categories
- Read student comments (anonymous students hidden)

---

## API Endpoints

### Feedback Form Management (Admin Only)
```
POST   /api/feedback-form/create          - Create new form
GET    /api/feedback-form/all             - Get all forms
PUT    /api/feedback-form/:id             - Update form
DELETE /api/feedback-form/:id             - Delete form
PATCH  /api/feedback-form/:id/toggle      - Toggle active/inactive
```

### Student Access
```
GET    /api/feedback-form/available       - Get available forms for student
POST   /api/feedback/submit               - Submit feedback
GET    /api/feedback/my-feedback          - View own submissions
```

### Admin Feedback Viewing
```
GET    /api/feedback/all                  - View all feedback (Admin only)
GET    /api/feedback/summary/:facultyId   - Faculty summary (Admin only)
```

---

## Security

### Role-Based Access Control

| Action | Student | Faculty | Admin |
|--------|---------|---------|-------|
| Create Forms | ❌ | ❌ | ✅ |
| View Available Forms | ✅ | ❌ | ✅ |
| Submit Feedback | ✅ | ❌ | ❌ |
| View Own Submissions | ✅ | ❌ | ❌ |
| View All Feedback | ❌ | ❌ | ✅ |
| View Faculty Ratings | ❌ | ❌ | ✅ |

**Important:** Faculty CANNOT see their own feedback (confidential)

---

## Benefits of This System

### For Admin:
- ✅ Control over feedback timing
- ✅ Structured feedback collection
- ✅ Targeted forms for specific faculty/subjects
- ✅ Easy to activate/deactivate forms
- ✅ Better data organization

### For Students:
- ✅ Clear list of pending feedbacks
- ✅ No confusion about which faculty to rate
- ✅ Deadline visibility
- ✅ Track submitted feedbacks
- ✅ Pre-filled information (less errors)

### For Faculty:
- ✅ Confidential feedback (they cannot see it)
- ✅ Fair evaluation process
- ✅ Professional assessment

---

## Example Use Case

**Scenario: Mid-Semester Feedback Collection**

1. **Week 7**: Admin creates feedback forms for all faculty teaching in Semester 3
2. **Week 8-9**: Forms are active, students submit feedback
3. **Week 10**: Admin deactivates forms after deadline
4. **Week 11**: Admin reviews feedback and generates reports
5. **Week 12**: Admin shares aggregated feedback with department heads

---

## Database Models

### FeedbackForm Model
```javascript
{
  title: String,
  description: String,
  facultyId: ObjectId,
  subjectId: ObjectId,
  branchId: ObjectId,
  semester: Number,
  startDate: Date,
  endDate: Date,
  isActive: Boolean,
  allowAnonymous: Boolean,
  createdBy: ObjectId (Admin)
}
```

### Feedback Model
```javascript
{
  feedbackFormId: ObjectId (optional),
  studentId: ObjectId,
  facultyId: ObjectId,
  subjectId: ObjectId,
  branchId: ObjectId,
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
  status: String (submitted/reviewed/archived)
}
```

---

**Last Updated**: October 24, 2025
**System Version**: Form-Based Feedback v2.0
