

const AdminSuspendedTeacher=async(req,res)=>{

    res.status(200).json({
        status:"Success",
        message:"Admin Suspended Teacher Successfully"
    })

}

module.exports=AdminSuspendedTeacher;