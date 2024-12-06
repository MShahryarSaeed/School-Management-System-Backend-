const adminModel = require("../../../models/Staff/Admin.model");

const GetSingleAdmin=async(req,res)=>{

    const {adminId}=req.params;

    const admin=await adminModel.findById(adminId);

    if(!admin) throw {statusCode:400,message:"Admin Not Found"}

    res.status(200).json({
        status:"Success",
        message:"Get Single Admin Successfully",
        admin:admin
    })

}

module.exports=GetSingleAdmin;