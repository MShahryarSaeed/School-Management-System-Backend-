const programModel = require("../../../models/Academic/Program.model");

const DeleteProgram = async (req, res) => {


    const { programId } = req.params;

    const deletedProgram = await programModel.findByIdAndDelete(programId);

    if (!deletedProgram) throw { statusCode: 400, message: "Program deletion failed" };

    res.status(200).json({
        status: "Success",
        message: "Program deleted successfully",
        deletedProgram:deletedProgram
    });
};

module.exports = DeleteProgram;

//ok
