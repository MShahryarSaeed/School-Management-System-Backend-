const express=require("express");

// Middlewares
const isLoggedIn = require("../../middlewares/isLoggedIn");
const isAdmin = require("../../middlewares/isAdmin");

// Controllers
const CreateAcademicYear = require("./controllers/CreateAcademicYear");
const GetAllAcademicYears = require("./controllers/GetAllAcademicYears");
const GetSingleAcademicYear = require("./controllers/GetSingleAcademicYear");
const UpdateAcademicYear = require("./controllers/UpdateAcademicYear");
const DeleteAcademicYear = require("./controllers/DeleteAcademicYear");

const academicYearRoutes=express.Router();


academicYearRoutes.get('/GetAllAcademicYears',isLoggedIn,isAdmin,GetAllAcademicYears);
academicYearRoutes.post('/createYear',isLoggedIn,isAdmin,CreateAcademicYear);
academicYearRoutes.get('/GetSingleAcademicYear/:yearId',isLoggedIn,isAdmin,GetSingleAcademicYear);
academicYearRoutes.put('/UpdateAcademicYear/:yearId',isLoggedIn,isAdmin,UpdateAcademicYear);
academicYearRoutes.delete('/DeleteAcademicYear/:yearId',isLoggedIn,isAdmin,DeleteAcademicYear);


module.exports=academicYearRoutes;