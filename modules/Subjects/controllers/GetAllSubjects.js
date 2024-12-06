const subjectModel = require("../../../models/Academic/Subject.model");

const GetAllSubjects = async (req, res) => {

    
    const subjects = await subjectModel.find({})
        .populate('teacher')
        .populate('academicTerm')
        .populate('createdBy');

    if (!subjects) throw { statusCode: 400, message: "No Subjects found" };

    res.status(200).json({
        status: "Success",
        message: "Get All Subjects successfully",
        subjects
    });
};

module.exports = GetAllSubjects;
