const jsonwebtoken=require("jsonwebtoken");

const jwtManager=(user)=>{

    const accessToken=jsonwebtoken.sign({_id:user._id,role:user.role},process.env.JWT_SECRET,{expiresIn:'3d'});

    return accessToken;

}


module.exports=jwtManager;