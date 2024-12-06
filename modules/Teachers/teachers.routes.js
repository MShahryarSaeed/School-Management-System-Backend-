const express = require("express");

// Middlewares
const isLoggedIn = require("../../middlewares/isLoggedIn");
const isAdmin = require("../../middlewares/isAdmin");

// models
const teacherModel = require("../../models/Staff/Teacher.model");

// Controllers
const  AdminRegisteredTeacher= require("./controllers/AdminRegisteredTeacher");
const GetAllTeachers = require("./controllers/GetAllTeachersByAdmin");

const UpdateTeacher = require("./controllers/UpdateTeacherProfile");
const DeleteTeacher = require("./controllers/DeleteTeacher");
const TeacherLogin = require("./controllers/TeacherLogin");
const GetAllTeachersByAdmin = require("./controllers/GetAllTeachersByAdmin");
const isTeacher = require("../../middlewares/isTeacher");
const GetTeacherProfile = require("./controllers/GetTeacherProfile");
const GetTeacherByAdmin = require("./controllers/GetTeacherByAdmin");
const UpdateTeacherProfile = require("./controllers/UpdateTeacherProfile");
const AdminUpdateTeacher = require("./controllers/AdminUpdateTeacher");
const AdvanceResults = require("../../middlewares/AdvanceResults");


const teacherRoutes = express.Router();

teacherRoutes.post('/AdminRegisteredTeacher', isLoggedIn, isAdmin, AdminRegisteredTeacher); //ok
teacherRoutes.post('/login',TeacherLogin); //ok

teacherRoutes.get('/GetAllTeachersByAdmin',isLoggedIn,isAdmin,AdvanceResults(teacherModel,{
    path:"examsCreated",
    populate:{
        path:"questions",
    }
}),GetAllTeachersByAdmin); //ok

teacherRoutes.get('/GetTeacherByAdmin/:teacherId',isLoggedIn,isAdmin,GetTeacherByAdmin); //ok

teacherRoutes.get('/GetTeacherProfile',isLoggedIn,isTeacher,GetTeacherProfile); //ok

teacherRoutes.put('/UpdateTeacherProfile/:teacherId', isLoggedIn, isTeacher, UpdateTeacherProfile); //oks

teacherRoutes.put('/AdminUpdateTeacher/:teacherId',isLoggedIn,isAdmin,AdminUpdateTeacher);

module.exports = teacherRoutes;
