const teacherModel=require("../../../models/Staff/Teacher.model");

const GetTeacherProfile=async(req,res)=>{

    const profileTeacher=await teacherModel.findById(req.user._id);

    if(!profileTeacher) throw {statusCode:400,message:"Teacher Not Found"}

    res.status(200).json({
        status:"Success",
        message:"Get Teacher Profile Successfully",
        profileTeacher:profileTeacher
    })

}

module.exports=GetTeacherProfile;