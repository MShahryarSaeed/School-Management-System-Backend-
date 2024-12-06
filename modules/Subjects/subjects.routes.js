const express = require("express");

// Middlewares
const isLoggedIn = require("../../middlewares/isLoggedIn");
const isAdmin = require("../../middlewares/isAdmin");

// Controllers
const CreateSubject = require("./controllers/CreateSubject");
const GetAllSubjects = require("./controllers/GetAllSubjects");
const GetSingleSubject = require("./controllers/GetSingleSubject");
const UpdateSubject = require("./controllers/UpdateSubject");
const DeleteSubject = require("./controllers/DeleteSubject");

const subjectRoutes = express.Router();

subjectRoutes.get("/GetAllSubjects", isLoggedIn, isAdmin, GetAllSubjects);
subjectRoutes.post("/createSubject/:programId", isLoggedIn, isAdmin, CreateSubject);
subjectRoutes.get("/GetSingleSubject/:subjectId", isLoggedIn, isAdmin, GetSingleSubject);
subjectRoutes.put("/UpdateSubject/:subjectId", isLoggedIn, isAdmin, UpdateSubject);
subjectRoutes.delete("/DeleteSubject/:subjectId", isLoggedIn, isAdmin, DeleteSubject);

module.exports = subjectRoutes;
