const { skip } = require("node:test");
const teacherModel=require("../../../models/Staff/Teacher.model");

const GetAllTeachersByAdmin=async(req,res)=>{
    // console.log(req.res);
    
    // Query String ?startIndex=1
    // Params /:id

    // Convert Query String
    // const page=parseInt(req.query.page) || 1;
    // const limit=parseInt(req.query.limit) || 1;
    // const skip=(page-1)*limit;
    // const startIndex=(page-1)*limit;
    // const endIndex=page*limit;

    // const totalTeachers=await teacherModel.countDocuments();

    // // Pagination Results
    // const pagination={};

    // if(endIndex<totalTeachers){
    //     pagination.next={
    //         page:page+1,
    //         limit:limit
    //     }
    // }

    // // add prev
    // if(startIndex>0){
    //     pagination.prev={
    //         page:page-1,
    //         limit:limit
    //     }
    // }

    // const teachers=await teacherModel.find({
    //     ...(req.query.name && {name:{$regex:req.query.name,$options:'i'}}),
    //     ...(req.query.email && {email:req.query.email}),
    //     ...(req.query.teacherId && {teacherId:req.query.teacherId}),
    // }).skip(skip).limit(limit);

    // if(!teachers) throw {statusCode:400,message:"No Teachers Found"};

    // res.status(200).json({
    //     status:"Success",
    //     message:"Get All Teachers successfully",
    //     totalTeachers:totalTeachers,
    //     pagination:pagination,
    //     ResultsPerPage:teachers.length,
    //     teachers:teachers
    // });

    res.status(200).json(res.results)

}

module.exports=GetAllTeachersByAdmin;