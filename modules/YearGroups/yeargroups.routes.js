const express = require("express");

// Middlewares
const isLoggedIn = require("../../middlewares/isLoggedIn");
const isAdmin = require("../../middlewares/isAdmin");

// Controllers
const CreateYearGroup = require("./controllers/CreateYearGroup");
const GetAllYearGroups = require("./controllers/GetAllYearGroups");
const GetSingleYearGroup = require("./controllers/GetSingleYearGroup");
const UpdateYearGroup = require("./controllers/UpdateYearGroup");
const DeleteYearGroup = require("./controllers/DeleteYearGroup");

const yearGroupRoutes = express.Router();

yearGroupRoutes.get("/GetAllYearGroups", isLoggedIn, isAdmin, GetAllYearGroups);
yearGroupRoutes.post("/createYearGroup", isLoggedIn, isAdmin, CreateYearGroup);
yearGroupRoutes.get("/GetSingleYearGroup/:yearGroupId", isLoggedIn, isAdmin, GetSingleYearGroup);
yearGroupRoutes.put("/UpdateYearGroup/:yearGroupId", isLoggedIn, isAdmin, UpdateYearGroup);
yearGroupRoutes.delete("/DeleteYearGroup/:yearGroupId", isLoggedIn, isAdmin, DeleteYearGroup);

module.exports = yearGroupRoutes;
