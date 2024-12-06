const express = require("express");

// Middlewares
const isLoggedIn = require("../../middlewares/isLoggedIn");
const isAdmin = require("../../middlewares/isAdmin");

// Controllers
const CreateProgram = require("./controllers/CreateProgram");
const GetAllPrograms = require("./controllers/GetAllPrograms");
const GetSingleProgram = require("./controllers/GetSingleProgram");
const UpdateProgram = require("./controllers/UpdateProgram");
const DeleteProgram = require("./controllers/DeleteProgram");
const AddSubjectToProgram = require("./controllers/AddSubjectToProgram");

const programRoutes = express.Router();

programRoutes.get("/GetAllPrograms", isLoggedIn, isAdmin, GetAllPrograms);
programRoutes.post("/createProgram", isLoggedIn, isAdmin, CreateProgram);
programRoutes.get("/GetSingleProgram/:programId", isLoggedIn, isAdmin, GetSingleProgram);
programRoutes.put("/UpdateProgram/:programId", isLoggedIn, isAdmin, UpdateProgram);
programRoutes.delete("/DeleteProgram/:programId", isLoggedIn, isAdmin, DeleteProgram);

programRoutes.put('/:programId/subjects',isLoggedIn,isAdmin,AddSubjectToProgram);

module.exports = programRoutes;
