const programModel = require("../../../models/Academic/Program.model");
const adminModel = require("../../../models/Staff/Admin.model");

const CreateProgram = async (req, res) => {

    const { name, description, duration } = req.body; // Extract program details from the request body

    // Validate required fields
    if (!name) throw { statusCode: 400, message: "Name is required" };
    if (!description) throw { statusCode: 400, message: "Description is required" };
    if (!duration) throw { statusCode: 400, message: "Duration is required" };

    // Check if the program already exists
    const programFound = await programModel.findOne({ name: name });
    if (programFound) throw { statusCode: 400, message: "This Program already exists" };

    // Create a new program
    const newProgram = await programModel.create({
        name: name,
        description: description,
        duration: duration,
        createdBy: req.user._id // Assign the creator to the current user
    });

    // Check if creation failed
    if (!newProgram) throw { statusCode: 400, message: "Program creation failed" };

    // Update the current admin with the new program
    const currentAdmin = await adminModel.findById(req.user._id);
    if (!currentAdmin) throw { statusCode: 400, message: "Admin not found" };

    currentAdmin.programs.push(newProgram._id);
    await currentAdmin.save();

    // Send a success response with the newly created program
    res.status(201).json({
        status: "Success",
        message: "Program created successfully",
        newProgram: newProgram
    });
};

module.exports = CreateProgram;
