const express = require("express");
const isLoggedIn = require("../../middlewares/isLoggedIn");
const isAdmin = require("../../middlewares/isAdmin");
const isStudent = require("../../middlewares/isStudent");
const {
  StudentRegisteredByAdmin,
  studentLogin,
  StudentProfile,
  GetAllStudentsByAdmin,
  GetStudentByAdmin,
  StudentProfileUpdate,
  StudentProfileUpdateAdmin,
  StudentWriteExam,
} = require("./controllers/StudentCtrls");

const studentRoutes = express.Router();

studentRoutes.post(
  "/studentRegisteredByAdmin",
  isLoggedIn,
  isAdmin,
  StudentRegisteredByAdmin
);
studentRoutes.post("/studentLogin", studentLogin);
studentRoutes.get("/studentProfile", isLoggedIn, isStudent, StudentProfile);
studentRoutes.get(
  "/GetAllStudentsByAdmin",
  isLoggedIn,
  isAdmin,
  GetAllStudentsByAdmin
);
studentRoutes.get(
  "/GetStudentByAdmin/:studentId",
  isLoggedIn,
  isAdmin,
  GetStudentByAdmin
);

studentRoutes.put(
  "/studentUpdateProfile/:studentId",
  isLoggedIn,
  isStudent,
  StudentProfileUpdate
);
studentRoutes.put(
  "/StudentProfileUpdateByAdmin/:studentId",
  isLoggedIn,
  isAdmin,
  StudentProfileUpdateAdmin
);

studentRoutes.post("/exam/:examId/write",isLoggedIn,isStudent,StudentWriteExam);
module.exports = studentRoutes;
