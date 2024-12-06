const teacherModel=require("../../../models/Staff/Teacher.model");

const GetTeacherByAdmin=async(req,res)=>{

    const {teacherId}=req.params;

    const teacherExists=await teacherModel.findOne({_id:teacherId});

    if(!teacherExists) throw {statusCode:400,message:"Teacher Not Found"};

    res.status(200).json({
        status:"Success",
        message:"Teacher Found",
        teacher:teacherExists
    });

}

module.exports=GetTeacherByAdmin;