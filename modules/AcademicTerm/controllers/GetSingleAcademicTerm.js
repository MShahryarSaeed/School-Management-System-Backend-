const academicTermModel = require("../../../models/Academic/AcademicTerm.model");

const GetSingleAcademicTerm = async (req, res) => {
    
    const { termId } = req.params;

    const academicTerm = await academicTermModel.findById(termId);

    if (!academicTerm) throw { statusCode: 400, message: "Academic Term not found" };

    res.status(200).json({
        status: "Success",
        message: "Get Single Academic Term successfully",
        academicTerm:academicTerm
    });
};

module.exports = GetSingleAcademicTerm;
