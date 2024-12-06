// Required Dependencies
require("express-async-errors"); // Handles async errors
const dotenv = require("dotenv"); // Loads environment variables
const express = require("express"); // Express framework
const morgan = require("morgan"); // HTTP request logger
const colors = require("colors"); // Colorizes console output
const DataBaseConnection = require("../config/DataBaseConnection"); // Database connection setup
const cookieParser = require("cookie-parser"); // Parses cookies
const cors=require("cors");

// Importing Route Handlers
const adminRoutes = require("../modules/Admin/admins.routes");
const academicYearRoutes = require("../modules/AcademicYear/academicyears.routes");
const academicTermRoutes = require("../modules/AcademicTerm/academicterms.routes");
const classLevelRoutes = require("../modules/ClassLevels/classlevels.routes");
const programRoutes = require("../modules/Programs/programs.routes");
const subjectRoutes = require("../modules/Subjects/subjects.routes");
const yearGroupRoutes = require("../modules/YearGroups/yeargroups.routes");
const teacherRoutes = require("../modules/Teachers/teachers.routes");
const examRoutes = require("../modules/Exams/exams.routes");
const studentRoutes = require("../modules/Students/students.routes");
const questionRoutes = require("../modules/Questions/questions.routes");
const examResultRoutes = require("../modules/ExamResults/examresults.routes");

// Error Handling Middlewares
const errorHandler = require("../handlers/errorHandler"); // Custom error handler
const NotFound = require("../middlewares/NotFound"); // 404 error handler


// Initialize Express App
const app = express();
dotenv.config(); // Load environment variables

// Middlewares
app.use(express.json()); // Parse incoming JSON requests
app.use(morgan("dev")); // Log HTTP requests
app.use(cookieParser()); // Parse cookies
app.use(cors());

// Request Logging Middleware
app.use((req, res, next) => {

    console.log(colors.bgBlack(`Incoming ${req.method} request at URL: ${req.url}`));
    next();

});

// Database Connection
DataBaseConnection(); // Establish connection to the database

// Load Models
require("../models/Staff/Admin.model");
require("../models/Staff/Teacher.model");
require("../models/Academic/Program.model");
require("../models/Academic/Subject.model");
require("../models/Academic/AcademicYear.model");
require("../models/Academic/AcademicTerm.model");
require("../models/Academic/YearGroup.model");
require("../models/Academic/ClassLevel.model");
require("../models/Academic/Student.model");
require("../models/Academic/Exam.model");
require("../models/Academic/Questions.model");
require("../models/Academic/ExamResults.model");

// API Routes
app.use("/api/admins", adminRoutes);
app.use("/api/academicyears", academicYearRoutes);
app.use("/api/academicterms", academicTermRoutes);
app.use("/api/classlevels", classLevelRoutes);
app.use("/api/programs", programRoutes);
app.use("/api/subjects", subjectRoutes);
app.use("/api/yeargroups", yearGroupRoutes);
app.use("/api/teachers", teacherRoutes);
app.use("/api/exams", examRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/questions", questionRoutes);
app.use("/api/exam-results", examResultRoutes);

// Test Route
app.get('/', (req, res) => {

    res.send("Hello From School Management API");

});

// Error Handling Middlewares
app.use(NotFound); // Handle 404 errors
app.use(errorHandler); // Handle other errors

// Export Express App
module.exports = app;
