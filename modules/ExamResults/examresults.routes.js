const express=require("express");
const { CheckExamResult, GetAllExamResults, AdminToggleExamResult } = require("./controllers/ExamResultsCtrls");
const isLoggedIn = require("../../middlewares/isLoggedIn");
const isStudent = require("../../middlewares/isStudent");
const isAdmin = require("../../middlewares/isAdmin");


const examResultRoutes=express.Router();

examResultRoutes.get("/GetAllExamsResults",isLoggedIn,isStudent,GetAllExamResults);
examResultRoutes.get('/:examId/check',isLoggedIn,isStudent,CheckExamResult);
examResultRoutes.put('/AdminPublishExamResult/:examId',isLoggedIn,isAdmin,AdminToggleExamResult);


module.exports=examResultRoutes;