# 🎓 Campus360 - Complete College Management System

<div align="center">

[![MERN Stack](https://img.shields.io/badge/Stack-MERN-blue?style=for-the-badge)](https://www.mongodb.com/mern-stack)
[![License](https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge)](LICENSE)
[![Node.js](https://img.shields.io/badge/Node.js-v14+-brightgreen?style=for-the-badge&logo=node.js)](https://nodejs.org)
[![React](https://img.shields.io/badge/React-v18.2.0-blue?style=for-the-badge&logo=react)](https://reactjs.org)
[![MongoDB](https://img.shields.io/badge/MongoDB-v7.0-green?style=for-the-badge&logo=mongodb)](https://www.mongodb.com)

**Campus360** is a comprehensive, full-stack College Management System built with the MERN stack. It provides a complete 360-degree solution for managing all academic and administrative activities in educational institutions. This system streamlines operations through role-based dashboards for administrators, faculty members, and students.

[Features](#-features) • [Tech Stack](#-tech-stack) • [Installation](#-installation-guide) • [API Documentation](#-api-reference) • [Screenshots](#-screenshots) • [Contributing](#-contributing)

</div>

---

## 📋 Table of Contents

- [Overview](#overview)
- [Key Features](#-features)
- [Technology Stack](#-tech-stack)
- [System Architecture](#-system-architecture)
- [Installation Guide](#-installation-guide)
- [Configuration](#-configuration)
- [Default Credentials](#-default-credentials)
- [API Reference](#-api-reference)
- [Database Schema](#-database-schema)
- [Security Features](#-security-features)
- [Project Structure](#-project-structure)
- [Usage Guide](#-usage-guide)
- [Troubleshooting](#-troubleshooting)
- [Contributing](#-contributing)
- [License](#-license)
- [Contact](#-contact)

---

## 🌟 Overview

Campus360 is a modern, scalable web application designed to digitize and automate college management processes. It replaces traditional paper-based systems with an integrated digital platform that handles:

- **Student Information Management** - Complete student lifecycle from admission to graduation
- **Faculty Management** - Faculty profiles, assignments, and performance tracking
- **Attendance Tracking** - Digital attendance marking with real-time statistics
- **Feedback System** - Confidential faculty evaluation through structured forms
- **Academic Resources** - Centralized repository for study materials and timetables
- **Notice Board** - Instant communication channel for announcements
- **Examination Management** - Marks entry and result generation
- **Branch & Subject Management** - Curriculum organization by department and semester

**Built For:** Colleges, Universities, Coaching Centers, and Educational Institutions  
**Supports:** Multiple branches, semesters, subjects, and concurrent user roles

---

## ✨ Features

### 👨‍💼 Administrator Dashboard

**User Management**
- ✅ Create and manage faculty accounts with complete profile information
- ✅ Create and manage student accounts with enrollment numbers and academic details
- ✅ Bulk user operations and search functionality
- ✅ Role-based access control and permissions management
- ✅ Default password generation and reset capabilities

**Academic Management**
- ✅ Manage branches/departments (Computer Science, Mechanical, etc.)
- ✅ Create subjects/courses mapped to branches and semesters
- ✅ Upload and manage timetables by branch and semester
- ✅ Schedule exams and manage examination records

**Feedback System (Admin-Exclusive)**
- ✅ Create customized feedback forms for faculty evaluation
- ✅ Set active date ranges for feedback collection periods
- ✅ Configure forms per faculty, subject, branch, and semester
- ✅ View comprehensive feedback analytics and reports
- ✅ Faculty performance summaries with average ratings
- ✅ Anonymous feedback support for honest evaluations
- ✅ **Security:** Faculty members cannot view their own feedback

**Notice & Communication**
- ✅ Create and publish notices for students and faculty
- ✅ Categorize notices by target audience and importance
- ✅ Edit and delete announcements

**Reports & Analytics**
- ✅ Attendance reports by branch, semester, and subject
- ✅ Feedback summary reports with rating breakdowns
- ✅ Student performance analytics

### 👨‍🏫 Faculty Dashboard

**Profile Management**
- ✅ View and update personal information
- ✅ Emergency contact details and address
- ✅ Upload profile picture
- ✅ Change password and security settings

**Attendance Management**
- ✅ Mark student attendance (Present/Absent/Late/Excused)
- ✅ Bulk "Mark All Present" functionality
- ✅ Add remarks for individual attendance records
- ✅ Filter students by branch, semester, and subject
- ✅ Date-wise attendance tracking

**Study Materials**
- ✅ Upload course materials (PDF, DOC, PPT, images)
- ✅ Categorize materials (Notes, Assignments, Syllabus, Question Papers)
- ✅ Organize by subject and semester
- ✅ Edit and delete uploaded materials
- ✅ File size management with validation

**Student Information**
- ✅ Search students by enrollment number, name, or semester
- ✅ View detailed student profiles and academic information
- ✅ Access student contact details

**Timetable Management**
- ✅ Upload class timetables for assigned branches
- ✅ Semester-wise timetable organization

**Notice Board**
- ✅ View all published notices and announcements
- ✅ Filter notices by date and category

**Privacy & Security**
- 🔒 **Faculty members cannot access their own feedback** (confidential evaluation system)

### 👨‍🎓 Student Dashboard

**Profile Management**
- ✅ View personal and academic information
- ✅ Update contact details and address
- ✅ Upload profile picture
- ✅ Change password securely

**Attendance Tracking**
- ✅ View overall attendance statistics (total classes, present, absent, percentage)
- ✅ Subject-wise attendance breakdown
- ✅ Detailed attendance records with dates and remarks
- ✅ Color-coded status indicators (Present, Absent, Late, Excused)
- ✅ Real-time attendance percentage calculations

**Feedback Submission**
- ✅ View available feedback forms (automatically filtered by branch/semester)
- ✅ Fill out feedback for faculty using structured forms
- ✅ 5-point rating scale across 5 categories:
  - Teaching Quality
  - Knowledge of Subject
  - Communication Skills
  - Punctuality
  - Overall Rating
- ✅ Add text feedback for strengths and areas of improvement
- ✅ Option to submit anonymous feedback
- ✅ One-time submission per form (prevents duplicate feedback)
- ✅ View deadline and form details before submission

**Study Materials**
- ✅ Access course materials uploaded by faculty
- ✅ Filter materials by subject, semester, and type
- ✅ Download PDFs, documents, and other resources
- ✅ View material upload dates and descriptions

**Timetable**
- ✅ View class schedules for current semester
- ✅ Download timetable as image
- ✅ Filter by branch and semester

**Examination**
- ✅ View marks and grades for completed exams
- ✅ Subject-wise result display
- ✅ Overall performance tracking

**Notice Board**
- ✅ View all announcements and notices
- ✅ Real-time updates for new notices

---

## 🛠 Tech Stack

### Frontend
- **Framework:** React.js v18.2.0
- **State Management:** Redux
- **Routing:** React Router DOM v6.3.0
- **Styling:** Tailwind CSS v3.2.7
- **UI Components:** Custom components with Tailwind
- **Icons:** React Icons v4.7.1
- **Notifications:** React Hot Toast v2.4.0
- **HTTP Client:** Axios v1.3.4

### Backend
- **Runtime:** Node.js v14+
- **Framework:** Express.js v4.18.2
- **Database:** MongoDB with Mongoose ODM v7.0.2
- **Authentication:** JSON Web Tokens (JWT)
- **Password Security:** bcryptjs
- **File Upload:** Multer v1.4.5
- **Email:** Nodemailer v6.10.1
- **Environment Variables:** dotenv
- **Development:** Nodemon

### Database Schema
- **MongoDB Collections:**
  - AdminDetails, FacultyDetails, StudentDetails
  - Branches, Subjects, Exams, Marks
  - Attendance (with date-based tracking)
  - FeedbackForms, Feedback (with ratings and analytics)
  - Materials, Timetables, Notices
  - ResetPassword (for password recovery)

### Security & Authentication
- JWT-based authentication with Bearer tokens
- Role-based access control (Admin, Faculty, Student)
- Admin-only middleware for sensitive operations
- Password hashing with bcrypt
- Protected API routes
- Confidential feedback system

---

## 🏗 System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        CLIENT SIDE                          │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │    Admin     │  │   Faculty    │  │   Student    │     │
│  │  Dashboard   │  │  Dashboard   │  │  Dashboard   │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
│         │                  │                  │             │
│         └──────────────────┴──────────────────┘             │
│                            │                                │
│                    React.js + Redux                         │
│                      Axios HTTP Client                      │
└────────────────────────────┬────────────────────────────────┘
                             │
                    REST API (JWT Auth)
                             │
┌────────────────────────────┴────────────────────────────────┐
│                       SERVER SIDE                           │
│                    Express.js Backend                       │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Middlewares: Auth, Admin-Only, Multer (File Upload) │  │
│  └──────────────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Controllers: User, Attendance, Feedback, Materials   │  │
│  └──────────────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Routes: /api/admin, /api/faculty, /api/student      │  │
│  │          /api/attendance, /api/feedback-form          │  │
│  └──────────────────────────────────────────────────────┘  │
└────────────────────────────┬────────────────────────────────┘
                             │
                      Mongoose ODM
                             │
┌────────────────────────────┴────────────────────────────────┐
│                     DATABASE LAYER                          │
│                    MongoDB Database                         │
│  ┌─────────┐ ┌─────────┐ ┌──────────┐ ┌──────────────┐    │
│  │  Users  │ │Branches │ │Subjects  │ │ Attendance   │    │
│  └─────────┘ └─────────┘ └──────────┘ └──────────────┘    │
│  ┌─────────┐ ┌──────────────┐ ┌──────────┐ ┌─────────┐   │
│  │ Feedback│ │FeedbackForms │ │Materials │ │ Notices │   │
│  └─────────┘ └──────────────┘ └──────────┘ └─────────┘   │
└─────────────────────────────────────────────────────────────┘
```

---

## 📦 Installation Guide

### Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** v14 or higher ([Download](https://nodejs.org/))
- **npm** or **yarn** package manager (comes with Node.js)
- **MongoDB** (Local installation or [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account)
- **Git** for version control ([Download](https://git-scm.com/))
- A code editor (VS Code recommended)

### Step 1: Clone the Repository

```bash
git clone https://github.com/krish-7104/College-Management-System.git
cd College-Management-System
```

### Step 2: Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies (177 packages)
npm install

# The following packages will be installed:
# - express@4.18.2 (Web framework)
# - mongoose@7.0.2 (MongoDB ODM)
# - jsonwebtoken (JWT authentication)
# - bcryptjs (Password hashing)
# - multer@1.4.5 (File upload)
# - nodemailer@6.10.1 (Email service)
# - dotenv (Environment variables)
# - cors (Cross-Origin Resource Sharing)
```

### Step 3: Frontend Setup

```bash
# Navigate to frontend directory (from project root)
cd frontend

# Install dependencies (1489 packages)
npm install

# The following packages will be installed:
# - react@18.2.0 & react-dom@18.2.0
# - react-router-dom@6.3.0 (Routing)
# - redux & react-redux (State management)
# - axios@1.3.4 (HTTP client)
# - tailwindcss@3.2.7 (Styling)
# - react-hot-toast@2.4.0 (Notifications)
# - react-icons@4.7.1 (Icons)
```

---

## 🔧 Configuration

### Backend Environment Variables

Create a `.env` file in the `backend` directory:

```env
# Database Configuration
# Option 1: Local MongoDB
MONGODB_URI=mongodb://127.0.0.1:27017/College-Management-System

# Option 2: MongoDB Atlas (Recommended)
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/College-Management-System

# Server Configuration
PORT=4000
FRONTEND_API_LINK=http://localhost:3000

# JWT Secret Key (Change this to a random secure string)
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production

# Email Configuration (Optional - for password reset)
NODEMAILER_EMAIL=your-email@gmail.com
NODEMAILER_PASS=your-app-specific-password

# Note: For Gmail, generate an App Password from Google Account Settings
# Enable 2-Step Verification, then generate App Password
```

### Frontend Environment Variables

Create a `.env` file in the `frontend` directory:

```env
# Backend API URL
REACT_APP_APILINK=http://localhost:4000/api

# Media/Upload URL (for profile pictures, materials, timetables)
REACT_APP_MEDIA_LINK=http://localhost:4000/media
```

### MongoDB Atlas Setup (Recommended)

1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster (Free tier available)
3. Click "Connect" → "Connect your application"
4. Copy the connection string
5. Replace `<username>` and `<password>` with your database credentials
6. Whitelist your IP address or use `0.0.0.0/0` for all IPs (development only)
7. Paste the connection string in `MONGODB_URI` in backend `.env`

---

## 🚀 Running the Application

### Step 1: Seed Admin Account

Before starting the application, create the initial admin account:

```bash
# Navigate to backend directory
cd backend

# Run the seeder script
npm run seed
```

**✅ Default Admin Credentials Created:**
- **Employee ID:** `123456`
- **Password:** `admin123`
- **Email:** `admin@gmail.com`
- **Role:** Administrator

### Step 2: Start Backend Server

```bash
# From backend directory
npm run dev

# Expected output:
# > nodemon index.js
# Server Listening On http://localhost:4000
# Connected to MongoDB Successfully
```

The backend will run on **http://localhost:4000**

### Step 3: Start Frontend Server

Open a **new terminal** window:

```bash
# Navigate to frontend directory
cd frontend

# Start React development server
npm start

# Expected output:
# Compiled successfully!
# You can now view campus360 in the browser.
# Local: http://localhost:3000
```

The frontend will automatically open in your default browser at **http://localhost:3000**

### Step 4: Login and Explore

1. Open **http://localhost:3000** in your browser
2. Select **"Admin"** as login type
3. Enter credentials:
   - Employee ID: `123456`
   - Password: `admin123`
4. Click "Login"

**🎉 You're now logged into Campus360!**

---

## 🔐 Default Credentials

### Admin Account
```
Employee ID: 123456
Password: admin123
Email: admin@gmail.com
```

### Creating Faculty & Student Accounts

1. **Faculty:** Admin Dashboard → Faculty Tab → Add Faculty
   - Default Password: `faculty123` (customizable)
2. **Student:** Admin Dashboard → Student Tab → Add Student  
   - Default Password: `student123` (customizable)

**Note:** All users should change their passwords after first login for security.

## 📁 Project Structure

```
Campus360/
│
├── backend/                          # Node.js + Express Backend
│   ├── controllers/                  # Request handlers
│   │   ├── attendance.controller.js  # Attendance management
│   │   ├── branch.controller.js      # Branch CRUD operations
│   │   ├── exam.controller.js        # Exam management
│   │   ├── feedback.controller.js    # Feedback submission & viewing
│   │   ├── feedback-form.controller.js  # Feedback form management
│   │   ├── marks.controller.js       # Marks entry
│   │   ├── material.controller.js    # Study materials upload
│   │   ├── notice.controller.js      # Notice board
│   │   ├── subject.controller.js     # Subject management
│   │   ├── timetable.controller.js   # Timetable upload
│   │   └── details/                  # User management controllers
│   │       ├── admin-details.controller.js
│   │       ├── faculty-details.controller.js
│   │       └── student-details.controller.js
│   │
│   ├── models/                       # Mongoose schemas
│   │   ├── attendance.model.js       # Attendance records
│   │   ├── branch.model.js           # Department/Branch
│   │   ├── exam.model.js             # Examination details
│   │   ├── feedback.model.js         # Feedback submissions
│   │   ├── feedback-form.model.js    # Feedback form templates
│   │   ├── marks.model.js            # Student marks
│   │   ├── material.model.js         # Study materials
│   │   ├── notice.model.js           # Announcements
│   │   ├── reset-password.model.js   # Password reset tokens
│   │   ├── subject.model.js          # Course subjects
│   │   ├── timetable.model.js        # Class schedules
│   │   └── details/                  # User models
│   │       ├── admin-details.model.js
│   │       ├── faculty-details.model.js
│   │       └── student-details.model.js
│   │
│   ├── routes/                       # API endpoints
│   │   ├── attendance.route.js       # /api/attendance
│   │   ├── branch.route.js           # /api/branch
│   │   ├── exam.route.js             # /api/exam
│   │   ├── feedback.route.js         # /api/feedback
│   │   ├── feedback-form.route.js    # /api/feedback-form
│   │   ├── marks.route.js            # /api/marks
│   │   ├── material.route.js         # /api/material
│   │   ├── notice.route.js           # /api/notice
│   │   ├── subject.route.js          # /api/subject
│   │   ├── timetable.route.js        # /api/timetable
│   │   └── details/
│   │       ├── admin-details.route.js    # /api/admin
│   │       ├── faculty-details.route.js  # /api/faculty
│   │       └── student-details.route.js  # /api/student
│   │
│   ├── middlewares/                  # Custom middleware
│   │   ├── auth.middleware.js        # JWT authentication
│   │   ├── admin-only.middleware.js  # Admin role verification
│   │   └── multer.middleware.js      # File upload handling
│   │
│   ├── utils/                        # Utility functions
│   │   ├── ApiResponse.js            # Standard API response format
│   │   └── SendMail.js               # Email service (password reset)
│   │
│   ├── Database/                     # Database connection
│   │   └── db.js                     # MongoDB connection config
│   │
│   ├── media/                        # Uploaded files
│   │   ├── default_profile.jpg       # Default user avatar
│   │   ├── profiles/                 # Profile pictures
│   │   ├── materials/                # Study materials (PDF, DOC)
│   │   └── timetables/               # Timetable images
│   │
│   ├── admin-seeder.js               # Admin account creator
│   ├── app.js                        # Express app configuration
│   ├── index.js                      # Server entry point
│   ├── package.json                  # Backend dependencies
│   └── .env                          # Environment variables
│
├── frontend/                         # React Frontend
│   ├── public/                       # Static assets
│   │   ├── index.html                # HTML template
│   │   └── assets/                   # Images, icons
│   │
│   ├── src/
│   │   ├── components/               # Reusable components
│   │   │   ├── CustomButton.jsx      # Styled button component
│   │   │   ├── DeleteConfirm.jsx     # Delete confirmation modal
│   │   │   ├── Heading.jsx           # Section heading component
│   │   │   ├── Loading.jsx           # Loading spinner
│   │   │   ├── Navbar.jsx            # Top navigation bar
│   │   │   ├── NoData.jsx            # Empty state component
│   │   │   └── UpdatePasswordLoggedIn.jsx  # Password change form
│   │   │
│   │   ├── Screens/                  # Page components
│   │   │   ├── Login.jsx             # Login page
│   │   │   ├── ForgetPassword.jsx    # Password recovery
│   │   │   ├── UpdatePassword.jsx    # Password reset page
│   │   │   ├── Notice.jsx            # Notice board view
│   │   │   ├── Exam.jsx              # Examination page
│   │   │   │
│   │   │   ├── Admin/                # Admin pages
│   │   │   │   ├── Admin.jsx         # Admin management
│   │   │   │   ├── Branch.jsx        # Branch management
│   │   │   │   ├── Faculty.jsx       # Faculty management
│   │   │   │   ├── FeedbackFormManagement.jsx  # Create feedback forms
│   │   │   │   ├── FeedbackManagement.jsx      # View feedback reports
│   │   │   │   ├── Home.jsx          # Admin dashboard
│   │   │   │   ├── Profile.jsx       # Admin profile
│   │   │   │   ├── Student.jsx       # Student management
│   │   │   │   └── Subject.jsx       # Subject management
│   │   │   │
│   │   │   ├── Faculty/              # Faculty pages
│   │   │   │   ├── AddMarks.jsx      # Marks entry
│   │   │   │   ├── Home.jsx          # Faculty dashboard
│   │   │   │   ├── MarkAttendance.jsx  # Attendance marking
│   │   │   │   ├── Material.jsx      # Upload materials
│   │   │   │   ├── Profile.jsx       # Faculty profile
│   │   │   │   ├── StudentFinder.jsx # Student search
│   │   │   │   └── Timetable.jsx     # Upload timetable
│   │   │   │
│   │   │   └── Student/              # Student pages
│   │   │       ├── Attendance.jsx    # View attendance
│   │   │       ├── Feedback.jsx      # Submit feedback
│   │   │       ├── Home.jsx          # Student dashboard
│   │   │       ├── Material.jsx      # Access study materials
│   │   │       ├── Profile.jsx       # Student profile
│   │   │       ├── Timetable.jsx     # View timetable
│   │   │       └── ViewMarks.jsx     # View exam results
│   │   │
│   │   ├── redux/                    # State management
│   │   │   ├── action.js             # Action creators
│   │   │   ├── actions.js            # Action types
│   │   │   ├── reducers.js           # Redux reducers
│   │   │   └── store.js              # Redux store configuration
│   │   │
│   │   ├── utils/                    # Helper functions
│   │   │   └── AxiosWrapper.js       # Axios instance with interceptors
│   │   │
│   │   ├── App.js                    # Main App component
│   │   ├── App.jsx                   # App routing
│   │   ├── baseUrl.js                # API base URL configuration
│   │   ├── index.css                 # Global styles (Tailwind)
│   │   └── index.js                  # React entry point
│   │
│   ├── tailwind.config.js            # Tailwind CSS configuration
│   ├── package.json                  # Frontend dependencies
│   └── .env                          # Environment variables
│
├── LICENSE                           # MIT License
└── README.md                         # Project documentation
```

---

## 🎯 Key Features of Campus360

### Attendance Management System
- **Faculty**: Mark attendance for students (Present/Absent/Late/Excused)
- **Students**: View attendance records with statistics and percentages
- **Admin**: Generate attendance reports

### Feedback System
- **Admin**: Create feedback forms for specific faculty, subject, branch, and semester
- **Students**: Fill out available feedback forms with 5-point rating system
- **Confidential**: Faculty cannot view their own feedback
- **Analytics**: Admin can view comprehensive feedback reports and summaries

### Role-Based Access Control
- Separate dashboards for Admin, Faculty, and Students
- Protected API routes with JWT authentication
- Admin-only middleware for sensitive operations

---

## 📞 Contact & Support

### Developer

**M Govind Mukhiya**

- 🌐 Website: [mrgovind.netlify.app](http://mrgovind.netlify.app/)
- 💼 LinkedIn: [linkedin.com/in/m-govind-mukhiya-453a59302](https://www.linkedin.com/in/m-govind-mukhiya-453a59302/)
- 📧 Email: [govindmukhiya9963@gmail.com](mailto:govindmukhiya9963@gmail.com)
  

### Support

For questions, issues, or feature requests:

1. **Check Documentation** - Read this README thoroughly
2. **Search Issues** - Check if someone already reported it
3. **Open Issue** - Create detailed bug report or feature request
4. **Contact Developer** - Email for urgent matters



## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

### How to Contribute

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

<div align="center">

### ⭐ Star this repository if you find it helpful!

Made with ❤️ for the education community

**Campus360** - Complete College Management System  
Version 2.0 | 2025

</div>
