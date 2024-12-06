const programModel = require("../../../models/Academic/Program.model");
const subjectModel = require("../../../models/Academic/Subject.model"); // Ensure the correct model is imported

const AddSubjectToProgram = async (req, res) => {

    const { name } = req.body; // Extract subject name from the request body
    const { programId } = req.params; // Extract program ID from the request parameters

    // Find the program by ID
    const programFound = await programModel.findById(programId); //programId from params
    if (!programFound) throw { statusCode: 400, message: "Program not found" };

    // Find the subject by name
    const subjectFound = await subjectModel.findOne({ name: name });
    if (!subjectFound) throw { statusCode: 400, message: "Subject not found in Subject Model" };

    // Check if the subject is already associated with the program
    const subjectExists = programFound.subjects.find(
        (subject) => subject.toString() === subjectFound._id.toString()
    );

    if (subjectExists) throw { statusCode: 400, message: "Subject already exists" };

    // Add the subject to the program
    programFound.subjects.push(subjectFound._id);
    await programFound.save();

    // Send a success response with the updated program
    res.status(200).json({
        status: "Success",
        message: "Subject added to program successfully",
        program: programFound
    });
};

module.exports = AddSubjectToProgram;
