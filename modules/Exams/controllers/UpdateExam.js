const examModel = require("../../../models/Academic/Exam.model");

const UpdateExam = async (req, res) => {

    const { examId } = req.params;

    const { name, description, subject, program, passMark, totalMark, academicTerm, duration, examDate, examTime, examType, classLevel, academicYear } = req.body;

    // check if exam already found

    const examFound = await examModel.findOne({name:name});
    if (examFound) throw { statusCode: 400, message: "Exam already exists" };

    const updatedExam = await examModel.findByIdAndUpdate(
        examId,
        {
            $set: {
                name,
                description,
                subject,
                program,
                passMark,
                totalMark,
                academicTerm,
                duration,
                examDate,
                examTime,
                examType,
                classLevel,
                academicYear,
            },
        },
        { new: true, runValidators: true }
    );

    if (!updatedExam) throw { statusCode: 400, message: "Exam update failed" };

    res.status(200).json({
        status: "Success",
        message: "Exam updated successfully",
        updatedExam:updatedExam,
    });
};

module.exports = UpdateExam;
