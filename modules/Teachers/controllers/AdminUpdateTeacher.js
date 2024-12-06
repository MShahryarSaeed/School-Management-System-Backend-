const teacherModel = require("../../../models/Staff/Teacher.model");


const AdminUpdateTeacher=async(req,res)=>{

    const { teacherId } = req.params;
    const { program, classLevel, academicYear, subject } = req.body;

    if (req.user.role !== 'admin') {
        throw { statusCode: 400, message: "Only Admin Can Update the Teacher's Profile" };
    }

    const teacherFound=await teacherModel.findById(teacherId);

    if(!teacherFound) throw {statusCode:400,message:"Teacher Not Found"};

    if(teacherFound.isWitdrawn){
        throw {statusCode:400,message:"Teacher Already Withdrawn"};
    }

    //assign program
    if(program){

        teacherFound.program=program;
        await teacherFound.save();

        res.status(200).json({
            status: "Success",
            message: "Teacher Updated Successfully",
            updatedTeacher: teacherFound
        })
    }

    if(classLevel){
        teacherFound.classLevel=classLevel;
        await teacherFound.save();

        res.status(200).json({
            status: "Success",
            message: "Teacher Updated Successfully",
            updatedTeacher: teacherFound
        })
    }

    if(academicYear){
        teacherFound.academicYear=academicYear;
        await teacherFound.save();

        res.status(200).json({
            status: "Success",
            message: "Teacher Updated Successfully",
            updatedTeacher: teacherFound
        })
    }

    if(subject){
        
        teacherFound.subject=subject;
        await teacherFound.save();

        res.status(200).json({
            status: "Success",
            message: "Teacher Updated Successfully",
            updatedTeacher: teacherFound
        })
    }

  
}

module.exports=AdminUpdateTeacher;