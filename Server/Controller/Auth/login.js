
const user=require("../../Model/user.js")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const dotenv=require("dotenv")
dotenv.config()

async function login(req,res){
  const {email,password}=req.body
 
  const userExist=await user.findOne({email})
  if(!userExist){
    return res.status(401).json({
        success: false,
        error: {
            code: "400",
            message: "user not exist!!"
        }
    })
  }
const isPassword=await bcrypt.compare(password,userExist.password)

if(!isPassword){
    return res.status(401).json({
        success: false,
        error: {
            code: "400",
            message: "invalid credentials!!"
        }
    })
}

const token=await jwt.sign({id:userExist._id},process.env.SECURITY_JWT,{expiresIn: '1d'})
res.status(201).json({
    success:true,
    message:"login success full!!",
    user:{
        token
    }
})

}

module.exports= login 