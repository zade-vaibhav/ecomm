const jwt=require("jsonwebtoken")
const bcrypt=require("bcrypt")
const dotenv=require("dotenv");
const reset_password = require("../../Model/userPasswordOtp");
dotenv.config()

async function verifyOtp(req,res){
    const {otp}=req.body
    const token = req.headers.authorization.split(" ")[1];

    try{
    const tokendata=await jwt.verify(token,process.env.SECURITY_JWT)
    console.log(tokendata)
    const isOtp=await reset_password.findOne({owner:tokendata.id});
    console.log(isOtp)
    if(isOtp){
         
        if(isOtp.date_expires<Date.now()){
            res.status(400).json({
                success:false,
                message:"session expired!!"
            })
        }else{
            const compareOtp=await bcrypt.compare(otp,isOtp.otp);
            console.log(compareOtp)
            if(compareOtp){
               
                await reset_password.findOneAndDelete({owner:tokendata.id})

                res.status(200).json({
                    success:true,
                    message:"OTP verified successfully!!",
                    user:{
                        token
                    }
                })

            }else{
                res.status(400).json({
                    success:false,
                    message:"invalid OTP!!"
                })
        }
        }
    }else{
        res.status(400).json({
            success:false,
            message:"Invalid Request!!"
        })
    }
    }catch(err){
        res.status(400).json({
            success:false,
            message:err
        })
    }

}

module.exports=verifyOtp;