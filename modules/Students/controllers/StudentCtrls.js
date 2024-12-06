const jwtManager = require("../../../managers/jwtManager");
const studentModel = require("../../../models/Academic/Student.model");
const examModel = require("../../../models/Academic/Exam.model");
const examResultsModel=require("../../../models/Academic/ExamResults.model");
const adminModel=require("../../../models/Staff/Admin.model");
const bcryptjs = require("bcryptjs");

//@desc  Admin Register Student
//@route POST /api/students/admin/register
//@acess  Private Admin only
const StudentRegisteredByAdmin = async (req, res) => {

    const { name, email, password } = req.body;

    // validations
    if (!name) throw { statusCode: 400, message: "Name is Required" };
    if (!email) throw { statusCode: 400, message: "Email is Required" };
    if (!password) throw { statusCode: 400, message: "Password is Required" };

    // checking
    const studentFound = await studentModel.findOne({ email: email });
    if (studentFound) throw { statusCode: 400, message: "Student Already employed" };

    // hash password
    const hashedPassword = await bcryptjs.hash(password, 10);

    // create
    const newStudent = await studentModel.create({
        name: name,
        email: email,
        password: hashedPassword,
    });

    if (!newStudent) throw { statusCode: 400, message: "Student Registration Failed" };

    const currentAdmin=await adminModel.findById(req.user._id);

    if(!currentAdmin) throw {statusCode:400,message:"Admin Not Found"}
    currentAdmin.students.push(newStudent?._id);

    await currentAdmin.save();

    const { password: pass, ...rest } = newStudent._doc;

    // send response
    res.status(201).json({
        status: "success",
        message: "Student registered successfully",
        student: rest,
    });


}


//@desc    login  student
//@route   POST /api/v1/students/login
//@access  Public

const studentLogin = async (req, res) => {

    const { email, password } = req.body;

    // validations
    const studentFound = await studentModel.findOne({ email: email });
    if (!studentFound) throw { statusCode: 400, message: "Student Not Found" };

    // checking
    const comparePassword = await bcryptjs.compare(password, studentFound.password);
    if (!comparePassword) throw { statusCode: 400, message: "Invalid Student Password" };

    const { password: pass, ...rest } = studentFound._doc;

    const accessToken = jwtManager(studentFound);


    // send response
    res.cookie('accessToken', accessToken, { httpOnly: true }).status(200).json({
        status: "success",
        message: "Student logged in successfully",
        student: rest,
        accessToken: accessToken
    });

}

//@desc    Student Profile
//@route   GET /api/v1/students/profile
//@access  Private Student only

const StudentProfile = async (req, res) => {

    const ProfileStudent = await studentModel.findById(req.user._id).populate("examResults").select("-password");

    if (!ProfileStudent) throw { statusCode: 400, message: "Student Not Found" };

    const studentProfile={
        name:ProfileStudent.name,
        email:ProfileStudent.email,
        examResults:ProfileStudent.examResults.isPublished,
        currentClassLevel:ProfileStudent.currentClassLevel,
        program:ProfileStudent?.program,
        dateAdmitted:ProfileStudent.dateAdmitted,    
        isSuspended:ProfileStudent?.isSuspended,
        isWithdrawn:ProfileStudent?.isWithdrawn,
        StudentId:ProfileStudent?.studentId,
        prefectName:ProfileStudent?.prefectName   
    }

    // Get StudentExam Result
    const examResults=ProfileStudent?.examResults;
    const currentExamResult=examResults[examResults.length-1];
    // check if Exam is published;
    const isPublished=currentExamResult.isPublished;

    console.log(currentExamResult);
    

    

    res.status(200).json({
        status: "success",
        message: "Student Profile fetched successfully",
        student:{
            studentProfile,
            currentExamResult:isPublished?currentExamResult : [],
        }

    });

}

//@desc    Get all Students
//@route   GET /api/v1/admin/students
//@access  Private admin only

const GetAllStudentsByAdmin = async (req, res) => {

    const students = await studentModel.find({}).select("-password");

    if (!students) throw { statusCode: 400, message: "Students Not Found" };

    res.status(200).json({
        status: "success",
        message: "Students fetched successfully",
        students: students
    })
}

//@desc    Get Single Student
//@route   GET /api/v1/students/:studentID/admin
//@access  Private admin only


const GetStudentByAdmin = async (req, res) => {

    const { studentId } = req.params;

    const student = await studentModel.findById(studentId);

    if (!student) throw { statusCode: 400, message: "Student Not Found" };

    res.status(200).json({
        status: "success",
        message: "Student fetched successfully",
        student: student
    })
}

//@desc    Student updating profile
//@route    UPDATE /api/v1/students/update
//@access   Private Student only

const StudentProfileUpdate = async (req, res) => {

    const { name, email } = req.body;
    const { studentId } = req.params;

    const emailExists = await studentModel.findOne({ email });
    if (emailExists) throw { statusCode: 400, message: "Email Already Exists" };

    const nameExists = await studentModel.findOne({ name });
    if (nameExists) throw { statusCode: 400, message: "Name Already Exists" };

    if (req.body.password) {
        req.body.password = await bcryptjs.hash(req.body.password, 10);
    }


    const updatedStudent = await studentModel.findByIdAndUpdate(
        { _id: studentId },
        {
            $set: {
                name: name,
                email: email,
                password: req.body.password
            }
        },
        {
            new: true,
            runValidators: true
        }
    );

    if (!updatedStudent) throw { statusCode: 400, message: "Profile Not Updated" };

    res.status(200).json({
        status: "success",
        message: "Profile Updated Successfully",
        updatedStudent: updatedStudent
    });

}

//@desc     Admin updating Students eg: Assigning classes....
//@route    UPDATE /api/v1/students/:studentID/update/admin
//@access   Private Admin only
const StudentProfileUpdateAdmin = async (req, res) => {

    const { classLevels, academicYear, program, name, email, prefectName,isSuspended,isWithdrawn } = req.body;

    const { studentId } = req.params;

    //find the student by id
    const studentFound = await studentModel.findById(studentId);
    if (!studentFound) throw { statusCode: 400, message: "Student Not Found" };

    //update
    const studentUpdated = await studentModel.findByIdAndUpdate(
        { _id: studentId },
        {
            $set: {
                name: name,
                email: email,
                academicYear: academicYear,
                program: program,
                prefectName: prefectName,
                isSuspended:isSuspended,
                isWithdrawn:isWithdrawn
            },
            $addToSet: {
                classLevels,
            },
        },
        {
            new: true,
            runValidators: true,
        }
    );
    //send response
    res.status(200).json({
        status: "success",
        message: "Student updated successfully",
        updatedStudent: studentUpdated
    });

}

//@desc      Students Writing Exam
//@route    POST /api/students/exam/:examId/write
//@access   Private Student only

const StudentWriteExam = async (req, res) => {

    // Find the student by their ID
    const studentFound = await studentModel.findById(req.user._id);
    if (!studentFound) throw { statusCode: 400, message: "Student Not Found" };

    // Find the exam by its ID and populate its questions
    const examFound = await examModel.findById(req.params.examId).populate("questions  academicTerm");
    if (!examFound) throw { statusCode: 400, message: "Exam Not Found" };

    // console.log("Student:", studentFound);
    // console.log("Exam:", examFound);

    const questions = examFound?.questions; //Array
    if (!questions) throw { statusCode: 400, message: "Questions Not Found" };

    const StudentAnswers = req.body.answers; //Array of correct answers from req.body; //Array[]

    // Ensure the student answered all questions
    if (StudentAnswers.length !== questions.length) {
        throw { statusCode: 400, message: "Please Answer All Questions" };
    }

    // check if student already taken the exam
    // if (studentFound.takenExams.includes(examFound._id)) {
    //     throw { statusCode: 400, message: "You have already taken this exam" };

    const studentFoundInResults=await examResultsModel.findOne({student:studentFound._id});
    if(studentFoundInResults) throw { statusCode: 400, message: "You have already taken this exam" };

    if(studentFound.isWithdrawn) {
        throw { statusCode: 400, message: "You have withdrawn from this exam" };
    }

    if(studentFound.isSuspended){
        throw { statusCode: 400, message: "You have been suspended from this exam" };
    }

    // Initialize variables for grading
    let correctAnswers = 0;
    let incorrectAnswers = 0;
    let totalQuestions = 0;
    let grade = 0;
    let score = 0;
    let answeredQuestions = [];
    let status = '';
    let Remarks = '';

    // Evaluate each question
    for (let i = 0; i < questions.length; i++) {

        const question = questions[i];

        // Check if the student's answer is correct
        if (question.correctAnswer === StudentAnswers[i]) {
            correctAnswers++;
            score++;
            question.isCorrect = true;
        } else {
            incorrectAnswers++;
        }
        
        totalQuestions++;
    }

    // Calculate grading and report
    totalQuestions = questions.length;
    grade = (correctAnswers / questions.length) * 100;
    answeredQuestions = questions.map(question => {
        return {
            question: question.question,
            correctAnswer: question.correctAnswer,
            isCorrect: question.isCorrect
        };
    });

    // Determine pass/fail status based on grade
    if (grade >= 50) {
        status = "Pass";
    } else {
        status = "Fail";
    }

    // Provide remarks based on grade
    if (grade >= 80) {
        Remarks = "Excellent";
    } else if (grade >= 70) {
        Remarks = "Very Good";
    } else if (grade >= 60) {
        Remarks = "Good";
    } else if (grade >= 50) {
        Remarks = "Fair";
    } else {
        Remarks = "Poor";
    }

    // Generate Exam Result
const ExamResults=await examResultsModel.create({

    studentID:studentFound?.studentId,
    exam:examFound?._id,
    grade:grade,
    score:score,
    remarks:Remarks,
    classLevel:examFound.classLevel,
    academicTerm:examFound.academicTerm,
    academicYear:examFound.academicYear,
    status:status,
    answeredQuestions:answeredQuestions

});

// push Result into student
studentFound.examResults.push(ExamResults?._id);
await studentFound.save();

// Promoting student to next class Level 200
console.log(examFound.academicTerm);
if(examFound.academicTerm.name==='3rd Term' && status==="Pass" && studentFound.currentClassLevel==='level 100'){
    //promote student
    studentFound.classLevels.push('level 200');
    studentFound.currentClassLevel='level 200';
    await studentFound.save();
}

// Promoting student to next class Level 300
if(examFound.academicTerm.name==='3rd Term' && status==="Pass" && studentFound.currentClassLevel==='level 200'){
    //promote student
    studentFound.classLevels.push('level 300');
    studentFound.currentClassLevel='level 300';
    await studentFound.save();
}

// Promoting student to next class Level 400
if(examFound.academicTerm.name==='3rd Term' && status==="Pass" && studentFound.currentClassLevel==='level 300'){
    //promote student
    studentFound.classLevels.push('level 400');
    studentFound.currentClassLevel='level 400';
    await studentFound.save();
}

// Promoting student to  Graduate
if(examFound.academicTerm.name==='3rd Term' && status==="Pass" && studentFound.currentClassLevel==='level 400'){
    //promote student
   studentFound.isGraduated=true;
   studentFound.yearGraduated=new Date();
    await studentFound.save();
}

    // Send the exam results in the response
    // res.status(200).json({
    //     status: "success",
    //     message: "Exam written successfully",
    //     correctAnswers,
    //     incorrectAnswers,
    //     score,
    //     totalQuestions,
    //     grade,
    //     answeredQuestions,
    //     status,
    //     Remarks,
    //     ExamResults,
    //     studentFound
    // });

    res.status(200).json({
        status: "success",
        message: "Exam written successfully",
    })
};






module.exports = { StudentRegisteredByAdmin, studentLogin, StudentProfile, GetAllStudentsByAdmin, GetStudentByAdmin, StudentProfileUpdate, StudentProfileUpdateAdmin, StudentWriteExam };




