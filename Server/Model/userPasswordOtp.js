const mongoose=require("mongoose")


const userOtp=new mongoose.Schema({
   owner:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"user",
    required:true
   },
   otp:{
    type:String,
    required:true
   },
   date_created:{
    type:Date,
    default:Date.now()
   },
   date_expires:{
    type:Date,
    default:Date.now()
   }

})


const reset_password=mongoose.model("resetPasswordOtps",userOtp);

module.exports=reset_password;