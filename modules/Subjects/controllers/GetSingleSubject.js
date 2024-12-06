const subjectModel = require("../../../models/Academic/Subject.model");

const GetSingleSubject = async (req, res) => {
    const { subjectId } = req.params;

    const subject = await subjectModel.findById(subjectId)
        .populate('teacher')
        .populate('academicTerm')
        .populate('createdBy');

    if (!subject) throw { statusCode: 400, message: "Subject not found" };

    res.status(200).json({
        status: "Success",
        message: "Get Single Subject successfully",
        subject
    });
};

module.exports = GetSingleSubject;
