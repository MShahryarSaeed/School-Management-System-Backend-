const examModel = require("../../../models/Academic/Exam.model");
const teacherModel=require("../../../models/Staff/Teacher.model");

const createExamByTeacher = async (req, res) => {

    const { name, description, subject, program, passMark, totalMark, academicTerm, duration, examDate, examTime, examType, classLevel, academicYear } = req.body;

    const { teacherId } = req.params;

    if(req.user._id!==teacherId){
        throw { statusCode: 400, message: "You are not authorized to perform this action" };
    }

    

    if (!name) throw { statusCode: 400, message: "Name is required" };
    if (!description) throw { statusCode: 400, message: "Description is required" };
    if (!subject) throw { statusCode: 400, message: "Subject is required" };
    if (!program) throw { statusCode: 400, message: "Program is required" };
    if (!academicTerm) throw { statusCode: 400, message: "Academic Term is required" };
    if (!classLevel) throw { statusCode: 400, message: "Class Level is required" };
    if (!academicYear) throw { statusCode: 400, message: "Academic Year is required" };

    // Find Teacher
    const teacherFound=await teacherModel.findById(teacherId);
    if(!teacherFound) throw { statusCode: 400, message: "Teacher not founds" };

    // Find Exam
    const examFound = await examModel.findOne({name:name});
    if (examFound) throw { statusCode: 400, message: "Exam already exists" };

    const newExam = await examModel.create({
        name:name,
        description:description,
        subject:subject,
        program:program,
        passMark:passMark,
        totalMark:totalMark,
        academicTerm:academicTerm,
        duration:duration,
        examDate:examDate,
        examTime:examTime,
        examType:examType,
        classLevel:classLevel,
        createdBy: req.user._id,
        academicYear:academicYear,
    });

    if (!newExam) throw { statusCode: 400, message: "Exam creation failed" };

    // push exam in teacher model
    teacherFound.examsCreated.push(newExam._id);
    await teacherFound.save();

    res.status(201).json({
        status: "Success",
        message: "Exam created successfully By Teacher",
        newExam:newExam,
    });
};

module.exports = createExamByTeacher;
