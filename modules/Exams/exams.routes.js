const express=require("express");
const isLoggedIn = require("../../middlewares/isLoggedIn");
const isTeacher = require("../../middlewares/isTeacher");
const createExamByTeacher = require("./controllers/createExamByTeacher");
const GetAllExams = require("./controllers/GetAllExams");
const GetSingleExam = require("./controllers/GetSingleExam");
const UpdateExam = require("./controllers/UpdateExam");
const DeleteExam = require("./controllers/DeleteExam");


const examRoutes=express.Router();

examRoutes.get('/GetAllExams',isLoggedIn,isTeacher,GetAllExams);
examRoutes.post('/createExam/:teacherId',isLoggedIn,isTeacher,createExamByTeacher);
examRoutes.get('/GetSingleExam/:examId', isLoggedIn, isTeacher, GetSingleExam);
examRoutes.put('/updateExam/:examId',isLoggedIn,isTeacher,UpdateExam);
examRoutes.delete('/DeleteExam/:examId',isLoggedIn,isTeacher,DeleteExam);


module.exports=examRoutes;