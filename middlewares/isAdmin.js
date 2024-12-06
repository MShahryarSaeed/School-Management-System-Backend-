

const isAdmin=(req,res,next)=>{

    if(req.user.role==='admin'){

        next();

    }else{

        res.status(401).json({

            status:"Failed",
            error:"unAuthorized",
        });
        
    }

}


module.exports=isAdmin;