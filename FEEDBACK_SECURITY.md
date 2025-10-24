# Feedback System Security

## Access Control

### Student Access
- ✅ Can submit feedback for faculty
- ✅ Can view their own submitted feedback
- ❌ Cannot view other students' feedback
- ❌ Cannot view feedback summaries

### Faculty Access
- ❌ **CANNOT view their own feedback** (confidential)
- ❌ Cannot view feedback from students
- ❌ Cannot view feedback summaries
- ✅ Can continue teaching and using other features

### Admin Access
- ✅ Can view ALL feedback submitted by students
- ✅ Can view faculty performance summaries
- ✅ Can filter feedback by faculty, branch, subject, semester
- ✅ Can see average ratings for each faculty
- ✅ Can manage feedback (update status, delete if needed)

## Backend Security

### Protected Routes (Admin Only)
All feedback viewing routes are now protected with `adminOnly` middleware:

```
GET /api/feedback/all - View all feedback (Admin only)
GET /api/feedback/summary/:facultyId - View faculty summary (Admin only)
PUT /api/feedback/status/:id - Update feedback status (Admin only)
DELETE /api/feedback/:id - Delete feedback (Admin only)
```

### Student Routes
```
POST /api/feedback/submit - Submit feedback (Student only)
GET /api/feedback/my-feedback - View own submitted feedback (Student only)
```

### Removed Routes
- ❌ `GET /api/feedback/faculty-feedback` - **REMOVED** (Faculty can no longer view their feedback)

## Why Faculty Cannot See Feedback

1. **Confidentiality**: Students should feel safe giving honest feedback
2. **Anonymous Feedback**: Some feedback is submitted anonymously
3. **Objective Evaluation**: Admin can make unbiased decisions
4. **Professional Standards**: Follows educational institution best practices

## Frontend Access

- **Admin Dashboard**: Has "Feedback" tab to view all feedback and summaries
- **Student Dashboard**: Has "Feedback" tab to submit feedback and view their own submissions
- **Faculty Dashboard**: No feedback viewing feature (confidential)

## Testing

1. Login as **Student** → Submit feedback for a faculty member
2. Login as **Admin** → View feedback in "Feedback Management"
3. Login as **Faculty** → Confirm they cannot see feedback (no option available)

---

**Last Updated**: October 24, 2025
**Security Level**: Confidential - Admin Access Only
