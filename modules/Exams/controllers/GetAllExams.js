const examModel = require("../../../models/Academic/Exam.model");

const GetAllExams = async (req, res) => {

    const exams = await examModel.find({}).populate({
        path:"subject program academicTerm classLevel createdBy academicYear questions",
        populate:{
            path:"createdBy"
        }
    });

    if (!exams) throw { statusCode: 400, message: "No exams found" };

    res.status(200).json({
        status: "Success",
        message: "Get All Exams Successfully",
        exams:exams,
    });
};

module.exports = GetAllExams;
