const academicTermModel = require("../../../models/Academic/AcademicTerm.model");
const adminModel = require("../../../models/Staff/Admin.model");

const CreateAcademicTerm = async (req, res) => {

    const { name, description, duration } = req.body; // Extract the fields to create an academic term

    // Validate input fields
    if (!name) throw { statusCode: 400, message: "Name is required" };
    if (!description) throw { statusCode: 400, message: "Description is required" };
    // if (!duration) throw { statusCode: 400, message: "Duration is required" };

    // Check if an academic term with the same name already exists
    const academicTerm = await academicTermModel.findOne({ name: name });
    if (academicTerm) throw { statusCode: 400, message: "This Academic Term already exists" };

    // Create a new academic term
    const newAcademicTerm = await academicTermModel.create({
        name: name,
        description: description,
        duration: duration,
        createdBy: req.user._id // Set the creator to the current user
    });

    // Check if the creation failed
    if (!newAcademicTerm) throw { statusCode: 400, message: "Academic Term creation failed" };

    // Update the current admin with the new academic term
    const currentAdmin = await adminModel.findById(req.user._id);
    if (!currentAdmin) throw { statusCode: 400, message: "Admin not found" };

    currentAdmin.academicTerms.push(newAcademicTerm._id);
    await currentAdmin.save();

    // Send a success response with the newly created academic term
    res.status(201).json({
        status: "Success",
        message: "Academic Term created successfully",
        newAcademicTerm: newAcademicTerm
    });
};

module.exports = CreateAcademicTerm;
