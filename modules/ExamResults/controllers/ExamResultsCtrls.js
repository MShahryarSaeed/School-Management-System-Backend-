const examResultModel=require("../../../models/Academic/ExamResults.model");
const studentModel = require("../../../models/Academic/Student.model");

// Student Only
const CheckExamResult=async(req,res)=>{


    const {examId}=req.params;

    const studentFound=await studentModel.findById(req.user._id);
    if(!studentFound) throw {statusCode:400,message:"Student Not Found"};

    // Find ExamResult

    const examResultFound=await examResultModel.findOne({
        studentID:studentFound.studentId,
        _id:examId
    }).populate("academicYear academicTerm classLevel")
    .populate({
        path:"exam",
        populate:{
            path:"questions"
        }
    })


    if(!examResultFound) throw {statusCode:400,message:"Exam Result Not Found"};

    // check if examResult is published

    if(!examResultFound?.isPublished) throw {statusCode:400,message:"Exam Result Not Published"}


    res.status(200).json({

        status:"Success",

        message:"Check Exam Result Successfully",

        examResultFound :examResultFound,
        student:studentFound

    })

}

const GetAllExamResults=async(req,res)=>{


    const examResults=await examResultModel.find({}).select("exam").populate("exam");


    if(!examResults) throw {statusCode:400,message:"No Exam Results Found"}


    res.status(200).json({

        status:"Success",

        message:"Get All Exam Results Successfully",

        examResults

    })

}


// Admin Publish the Exam Result

const AdminToggleExamResult=async(req,res)=>{

    const examResult=await examResultModel.findById(req.params.examId);

    if(!examResult) throw {statusCode:400,message:"Exam Result Not Found"};

    const publishResult=await examResultModel.findByIdAndUpdate(
        req.params.examId,
        {
            $set:{
                isPublished:req.body.publish
            }
        },
        {
            new:true

        }
    );


    res.status(200).json({

        status:"Success",

        message:"Toggle Exam Result Successfully",

        publishResult

    })

}



module.exports={CheckExamResult,GetAllExamResults,AdminToggleExamResult}