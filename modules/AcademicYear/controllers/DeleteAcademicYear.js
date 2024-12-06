const academicYearModel=require("../../../models/Academic/AcademicYear.model");

const DeleteAcademicYear=async(req,res)=>{

    const {yearId}=req.params;

    const deletedYear=await academicYearModel.findByIdAndDelete(yearId);

    if(!deletedYear) throw {statusCode:400,message:"Academic Year Deletion Failed"};

    res.status(200).json({
        status:"Success",
        message:"Academic Year Deleted Successfully",
        deletedYear:deletedYear
    });

}

module.exports=DeleteAcademicYear;

