

const isStudent=(req,res,next)=>{

    if(req.user.role==='student'){

        next();

    }else{

        res.status(401).json({
            status:"Failed",
            error:"unAuthorized"
        });
        
    }

}


module.exports=isStudent;