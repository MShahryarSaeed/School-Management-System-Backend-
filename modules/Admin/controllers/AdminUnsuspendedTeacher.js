

const AdminUnsuspendedTeacher=async(req,res)=>{


    res.status(200).json({
        status:"Success",
        message:"Admin Unsuspended Teacher Successfully"
    })

}


module.exports=AdminUnsuspendedTeacher;