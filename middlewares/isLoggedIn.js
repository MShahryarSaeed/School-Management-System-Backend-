const jsonwebtoken=require("jsonwebtoken");

const isLoggedIn=(req,res,next)=>{

    const accessToken=req.cookies.accessToken;

    if(!accessToken) {

        return res.status(401).json({
            status:"Failed",
            error:"AccessToken is Required"
        });

    }

    jsonwebtoken.verify(accessToken,process.env.JWT_SECRET,(error,user)=>{

        if(error){

            return res.status(401).json({
                status:"Failed",
                error:"unAuthorized"
            });

        }

        req.user=user;

        next();


    });

}

module.exports=isLoggedIn;