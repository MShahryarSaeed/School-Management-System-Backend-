const teacherModel=require("../../../models/Staff/Teacher.model");
const adminModel=require("../../../models/Staff/Admin.model");
const bcryptjs=require("bcryptjs");

const AdminRegisteredTeacher=async(req,res)=>{

    const{name,email,password}=req.body;

    // Validations
    if(!name) throw {statusCode:400,message:"Name is Required"};
    if(!email) throw {statusCode:400,message:"Email is Required"};
    if(!password) throw {statusCode:400,message:"Password is Required"};

    // Checking
    const teacherFound=await teacherModel.findOne({email:email});
    if(teacherFound) throw {statusCode:400,message:"Teacher Already Employed"};

    // hash Password
    const hashPassword=await bcryptjs.hash(password,10);

    const teacherCreated=await teacherModel.create({
        name:name,
        email:email,
        password:hashPassword
    });

    if(!teacherCreated) throw {statusCode:400,message:"Teacher creation Failed"};

    // Exclude password from the response
    const { password: pass, ...rest } = teacherCreated._doc;

    const currentAdmin=await adminModel.findById(req.user._id);
    if(!currentAdmin) throw {statusCode:400,message:"Admin Not Found"};

    currentAdmin.teachers.push(teacherCreated._id);
    await currentAdmin.save();

    res.status(201).json({
        status:"Success",
        message:"Teacher Registered Successfully",
        newTeacher:rest
    });

}

module.exports=AdminRegisteredTeacher;

// ok