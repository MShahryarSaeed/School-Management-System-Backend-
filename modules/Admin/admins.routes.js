const express=require("express");

const Registration = require("./controllers/Registration");
const AdminLogIn = require("./controllers/AdminLogIn");
const GetAllAdmins = require("./controllers/GetAllAdmins");
const GetSingleAdmin = require("./controllers/GetSingleAdmin");
const UpdateSingleAdmin = require("./controllers/UpdateSingleAdmin");
const DeleteSingleAdmin = require("./controllers/DeleteSingleAdmin");
const AdminSuspendedTeacher = require("./controllers/AdminSuspendedTeacher");
const AdminUnsuspendedTeacher = require("./controllers/AdminUnsuspendedTeacher");
const AdminWithdrawTeacher = require("./controllers/AdminWithdrawTeacher");
const AdminUnWithdrawTeacher = require("./controllers/AdminUnWithdrawTeacher");
const AdminPublishExamResult = require("./controllers/AdminPublishExamResult");
const AdminUnPublishExamResult = require("./controllers/AdminUnPublishExamResult");
const GetAdminProfile = require("./controllers/GetAdminProfile");
// Middlewares
const isLoggedIn = require("../../middlewares/isLoggedIn");
const isAdmin = require("../../middlewares/isAdmin");
const AdvanceResults = require("../../middlewares/AdvanceResults");

const adminModel=require("../../models/Staff/Admin.model");



const adminRoutes=express.Router();

// Admin Routes
adminRoutes.get("/GetAllAdmins",isLoggedIn,isAdmin,AdvanceResults(adminModel),GetAllAdmins);
adminRoutes.get('/GetAdminProfile',isLoggedIn,isAdmin,GetAdminProfile);
adminRoutes.post('/register',Registration);
adminRoutes.post('/login',AdminLogIn);
adminRoutes.get("/GetSingleAdmin/:adminId",isLoggedIn,isAdmin,GetSingleAdmin);
adminRoutes.put("/UpdateSingleAdmin/:adminId",isLoggedIn,isAdmin,UpdateSingleAdmin);
adminRoutes.delete("/DeleteSingleAdmin/:adminId",isLoggedIn,isAdmin,DeleteSingleAdmin);

// AdminSuspendedTeacher
adminRoutes.patch('/suspended/teacher/:teacherId',AdminSuspendedTeacher);
// AdminUnsuspendedTeacher
adminRoutes.patch('/unsuspended/teacher/:teacherId',AdminUnsuspendedTeacher);

// AdminWithdrawTeacher
adminRoutes.patch('/withdraw/teacher/:teacherId',AdminWithdrawTeacher);
// AdminUnWithdrawTeacher
adminRoutes.patch("/unwithdraw/teacher/:teacherId",AdminUnWithdrawTeacher);

// AdminPublishExamResult
adminRoutes.patch('/publish/exam/:examId',AdminPublishExamResult);
// AdminUnPublishExamResult
adminRoutes.patch('/unpublish/exam/:examId',AdminUnPublishExamResult);

module.exports=adminRoutes;