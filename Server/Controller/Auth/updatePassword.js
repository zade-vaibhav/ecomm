const jwt=require("jsonwebtoken")
const dotenv=require("dotenv");
const user = require("../../Model/user");
dotenv.config()
const bcrypt = require("bcrypt");
const { password_updated } = require("../../Helper/mail/mail");

async function updatePassword(req,res){
    const {password}=req.body;
    const token = req.headers.authorization.split(" ")[1];
    const tokenData=await jwt.verify(token,process.env.SECURITY_JWT);
    console.log(tokenData)
    try{

        if(tokenData){
            const userData=await user.findOne({_id:tokenData.id});
            console.log(userData)
            if(userData){
                const salt=10
                const newPassword=await bcrypt.hash(password,salt)
                const updatedUser=await user.findByIdAndUpdate({_id:tokenData.id},{$set:{password:newPassword}},{new:true})
                if(updatedUser){
                    await password_updated(updatedUser.name,updatedUser.email)
                    res.status(200).json({
                        success:true,
                        message:"Password updated!!"
                    })
                }else{
                    res.status(400).json({
                        success:false,
                        message:"Password not updated!!"
                    })
                }
            }else{
                res.status(400).json({
                    success:false,
                    message:"No user found!!"
                })
            }
        }else{
            res.status(400).json({
                success:false,
                message:"Invalid token!!!!"
            })
        }

    }catch(err){

        res.status(400).json({
            success:false,
            message:err.message
        })
    }

    
}

module.exports=updatePassword;