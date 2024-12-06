const express = require("express");

// Middlewares
const isLoggedIn = require("../../middlewares/isLoggedIn");
const isAdmin = require("../../middlewares/isAdmin");

// Controllers
const CreateAcademicTerm = require("./controllers/CreateAcademicTerm");
const GetAllAcademicTerms = require("./controllers/GetAllAcademicTerms");
const GetSingleAcademicTerm = require("./controllers/GetSingleAcademicTerm");
const UpdateAcademicTerm = require("./controllers/UpdateAcademicTerm");
const DeleteAcademicTerm = require("./controllers/DeleteAcademicTerm");

const academicTermRoutes = express.Router();

academicTermRoutes.get("/GetAllAcademicTerms", isLoggedIn, isAdmin, GetAllAcademicTerms);
academicTermRoutes.post("/createTerm", isLoggedIn, isAdmin, CreateAcademicTerm);
academicTermRoutes.get("/GetSingleAcademicTerm/:termId", isLoggedIn, isAdmin, GetSingleAcademicTerm);
academicTermRoutes.put("/UpdateAcademicTerm/:termId", isLoggedIn, isAdmin, UpdateAcademicTerm);
academicTermRoutes.delete("/DeleteAcademicTerm/:termId", isLoggedIn, isAdmin, DeleteAcademicTerm);

module.exports = academicTermRoutes;
