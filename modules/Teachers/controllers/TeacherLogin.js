const jwtManager = require("../../../managers/jwtManager");
const teacherModel=require("../../../models/Staff/Teacher.model");
const bcryptjs=require("bcryptjs");

const TeacherLogin=async(req,res)=>{

    const{email,password}=req.body;

    const teacherExists=await teacherModel.findOne({email:email});
    if(!teacherExists) throw {statusCode:400,message:"Teacher Not Found"};

    const comparePassword=await bcryptjs.compare(password,teacherExists.password);
    if(!comparePassword) throw {statusCode:400,message:"Incorrect Password"};

    const accessToken=jwtManager(teacherExists);

    const{password:pass,...rest}=teacherExists._doc;

    res.cookie('accessToken',accessToken,{httpOnly:true}).status(200).json({
        status:"Success",
        message:"Teacher Login Successfully",
        LoginTeacher:rest
    });

}

module.exports=TeacherLogin;