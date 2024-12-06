const express=require("express");
const { createQuestion, GetAllQuestions, GetSingleQuestion, UpdateQuestion } = require("./controllers/questionsCtrls");
const isLoggedIn = require("../../middlewares/isLoggedIn");
const isTeacher = require("../../middlewares/isTeacher");

const questionRoutes=express.Router();

questionRoutes.get('/GetAllQuestions',isLoggedIn,isTeacher,GetAllQuestions);
questionRoutes.post('/createQuestion/:examId',isLoggedIn,isTeacher,createQuestion);
questionRoutes.get('/GetSingleQuestion/:questionId',isLoggedIn,isTeacher,GetSingleQuestion);
questionRoutes.put('/update/:questionId',isLoggedIn,isTeacher,UpdateQuestion);


module.exports=questionRoutes;