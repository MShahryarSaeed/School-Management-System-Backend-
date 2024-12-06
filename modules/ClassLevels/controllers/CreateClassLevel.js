const classLevelModel = require("../../../models/Academic/ClassLevel.model");
const adminModel = require("../../../models/Staff/Admin.model");

const CreateClassLevel = async (req, res) => {

    const { name, description } = req.body; // Extract the fields to create a class level

    // Validate input fields
    if (!name) throw { statusCode: 400, message: "Name is required" };
    if (!description) throw { statusCode: 400, message: "Description is required" };

    // Check if a class level with the same name already exists
    const classLevelFound = await classLevelModel.findOne({ name: name });
    if (classLevelFound) throw { statusCode: 400, message: "This Class Level already exists" };

    // Create a new class level
    const newClassLevel = await classLevelModel.create({
        name: name,
        description: description,
        createdBy: req.user._id // Set the creator to the current user
    });

    // Check if the creation failed
    if (!newClassLevel) throw { statusCode: 400, message: "Class Level creation failed" };

    // Update the current admin with the new class level
    const currentAdmin = await adminModel.findById(req.user._id);
    if (!currentAdmin) throw { statusCode: 400, message: "Admin not found" };

    currentAdmin.classLevels.push(newClassLevel._id);
    await currentAdmin.save();

    // Send a success response with the newly created class level
    res.status(201).json({
        status: "Success",
        message: "Class Level created successfully",
        newClassLevel: newClassLevel
    });
};

module.exports = CreateClassLevel;
