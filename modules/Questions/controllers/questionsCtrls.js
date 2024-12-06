const questionModel=require("../../../models/Academic/Questions.model");
const examModel=require("../../../models/Academic/Exam.model");


//@desc  Create Question
//@route POST /api/v1/questions/:examID
//@acess Private  Teachers only
const createQuestion=async(req,res)=>{

    const {question,optionA,optionB,optionC,optionD,correctAnswer}=req.body;
    const {examId}=req.params;

    const examFound=await examModel.findById(examId);
    if(!examFound) throw {statusCode:400,message:"Exam not Found!"};

    const questionExists=await questionModel.findOne({question});
    if(questionExists) throw {statusCode:400,message:"Question Already Exists!"};

    const questionCreated=await questionModel.create({
        question,
        optionA,
        optionB,
        optionC,
        optionD,
        correctAnswer,
        createdBy:req.user._id
    });

    if(!questionCreated) throw {statusCode:400,message:"Question Not Created!"};

    examFound.questions.push(questionCreated?._id);
    await examFound.save();

    res.status(201).json({
        status:"success",
        message:"Question created",
        Question:questionCreated
    }); 
}

  
  //@desc  get all questions
  //@route GET /api/v1/questions
  //@acess  Private - Teacher only

const GetAllQuestions=async(req,res)=>{

    const questions=await questionModel.find({});

    if(!questions) throw {statusCode:400,message:"Questions Not Found"}

    res.status(200).json({
        status:"success",
        message:"Questions fetched successfully",
        Questions:questions
    })

}

  //@desc  get single Question
  //@route GET /api/v1/questions/:id
  //@acess  Private

  const GetSingleQuestion=async(req,res)=>{

    const{questionId}=req.params;

    const question=await questionModel.findById(questionId);

    if(!question) throw {statusCode:400,message:"Question Not Found"}

    res.status(200).json({
        status:"success",
        message:"Question fetched successfully",
        Question:question
    })

  }

    //@desc   Update  Question
  //@route  PUT /api/v1/questions/:id
  //@acess  Private Teacher only
  const UpdateQuestion=async(req,res)=>{

    const {question,optionA,optionB,optionC,optionD,correctAnswer}=req.body;

    const{questionId}=req.params;

    const questionFound=await questionModel.findOne({question:question});

    if(questionFound) throw {statusCode:400,message:"Question Already Found"};

    const questionUpdated=await questionModel.findByIdAndUpdate(
        {_id:questionId},
        {
            $set:{
                question,
                optionA,
                optionB,
                optionC,
                optionD,
                correctAnswer
            }
        },
        {
            new:true,
            runValidators:true
        }
    );


    if(!questionUpdated) throw {statusCode:400,message:"Question Not Updated"};


    res.status(200).json({
        status:"success",
        message:"Question updated successfully",
        Question:questionUpdated
    })

   
  }


module.exports={createQuestion,GetAllQuestions,GetSingleQuestion,UpdateQuestion};

