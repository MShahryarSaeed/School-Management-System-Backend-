const academicTermModel = require("../../../models/Academic/AcademicTerm.model");

const GetAllAcademicTerms = async (req, res) => {


    const academicTerms = await academicTermModel.find({});

    if (!academicTerms) throw { statusCode: 400, message: "No Academic Terms found" };

    res.status(200).json({
        status: "Success",
        message: "Get All Academic Terms successfully",
        academicTerms:academicTerms
    });
};

module.exports = GetAllAcademicTerms;
