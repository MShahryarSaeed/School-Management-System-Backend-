const examModel = require("../../../models/Academic/Exam.model");

const DeleteExam = async (req, res) => {
    const { examId } = req.params;

    const deletedExam = await examModel.findByIdAndDelete(examId);

    if (!deletedExam) throw { statusCode: 400, message: "Exam deletion failed" };

    res.status(200).json({
        status: "Success",
        message: "Exam deleted successfully",
        deletedExam,
    });
};

module.exports = DeleteExam;
