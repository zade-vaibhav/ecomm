const jwt=require("jsonwebtoken")
require("dotenv").config()



const userToToken=async (_id)=>{
    const token=await jwt.sign({user:_id},process.env.SECURITY_JWT,{expiresIn:"7d"})
    return token;
}


module.exports=userToToken