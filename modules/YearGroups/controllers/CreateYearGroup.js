const yearGroupModel = require("../../../models/Academic/YearGroup.model");
const academicYearModel = require("../../../models/Academic/AcademicYear.model");
const adminModel = require("../../../models/Staff/Admin.model");

const CreateYearGroup = async (req, res) => {

    const { name, academicYear } = req.body; // Extract name and academic year from request body

    if (!name) throw { statusCode: 400, message: "Name is required" }; // Validate name
    if (!academicYear) throw { statusCode: 400, message: "Academic Year is required" }; // Validate academic year

    // Check if the year group already exists
    const yearGroupFound = await yearGroupModel.findOne({ name });
    if (yearGroupFound) throw { statusCode: 400, message: "Year Group already exists" };

    // Create a new year group
    const newYearGroup = await yearGroupModel.create({
        name: name,
        academicYear: academicYear,
        createdBy: req.user._id,
    });

    if (!newYearGroup) throw { statusCode: 400, message: "Year Group creation failed" };

    // Find the current admin and update their year groups
    const currentAdmin = await adminModel.findById(req.user._id);
    if (!currentAdmin) throw { statusCode: 400, message: "Admin not found" };

    currentAdmin.yearGroups.push(newYearGroup._id);
    await currentAdmin.save();

    // Send success response with the created year group
    res.status(201).json({
        status: "Success",
        message: "Year Group created successfully",
        newYearGroup
    });
};

module.exports = CreateYearGroup;
