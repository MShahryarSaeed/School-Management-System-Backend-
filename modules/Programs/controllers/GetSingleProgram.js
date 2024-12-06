const programModel = require("../../../models/Academic/Program.model");

const GetSingleProgram = async (req, res) => {

    const { programId } = req.params;

    const program = await programModel.findById(programId)
        .populate('teachers')
        .populate('students')
        .populate('subjects');

    if (!program) throw { statusCode: 400, message: "Program not found" };

    res.status(200).json({
        status: "Success",
        message: "Get Single Program successfully",
        program:program
    });
};

module.exports = GetSingleProgram;
