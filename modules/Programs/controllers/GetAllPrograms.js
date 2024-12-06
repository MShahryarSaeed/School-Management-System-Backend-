const programModel = require("../../../models/Academic/Program.model");

const GetAllPrograms = async (req, res) => {


    const programs = await programModel.find({})
        .populate('teachers')
        .populate('students')
        .populate('subjects');

    if (!programs) throw { statusCode: 400, message: "No Programs found" };

    res.status(200).json({
        status: "Success",
        message: "Get All Programs successfully",
        programs:programs
    });
};

module.exports = GetAllPrograms;
