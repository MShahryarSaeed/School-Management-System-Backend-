const examModel = require("../../../models/Academic/Exam.model");

const GetSingleExam = async (req, res) => {

    
    const { examId } = req.params;

    const exam = await examModel.findById(examId).populate({
        path:"subject program academicTerm classLevel createdBy academicYear questions",
        populate:{
            path:"createdBy"
        }
    });
    if (!exam) throw { statusCode: 400, message: "Exam not found" };

    res.status(200).json({
        status: "Success",
        message: "Get Single Exam Successfully",
        exam:exam,
    });
};

module.exports = GetSingleExam;
