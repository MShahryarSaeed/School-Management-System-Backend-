const express = require("express");

// Middlewares
const isLoggedIn = require("../../middlewares/isLoggedIn");
const isAdmin = require("../../middlewares/isAdmin");

// Controllers
const CreateClassLevel = require("./controllers/CreateClassLevel");
const GetAllClassLevels = require("./controllers/GetAllClassLevels");
const GetSingleClassLevel = require("./controllers/GetSingleClassLevel");
const UpdateClassLevel = require("./controllers/UpdateClassLevel");
const DeleteClassLevel = require("./controllers/DeleteClassLevel");

const classLevelRoutes = express.Router();

classLevelRoutes.get("/GetAllClassLevels", isLoggedIn, isAdmin, GetAllClassLevels);
classLevelRoutes.post("/createClassLevel", isLoggedIn, isAdmin, CreateClassLevel);
classLevelRoutes.get("/GetSingleClassLevel/:levelId", isLoggedIn, isAdmin, GetSingleClassLevel);
classLevelRoutes.put("/UpdateClassLevel/:levelId", isLoggedIn, isAdmin, UpdateClassLevel);
classLevelRoutes.delete("/DeleteClassLevel/:levelId", isLoggedIn, isAdmin, DeleteClassLevel);

module.exports = classLevelRoutes;
