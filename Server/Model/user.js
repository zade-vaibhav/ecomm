const mongoose=require("mongoose")


const registration=new mongoose.Schema({
   name:{type:String,require:true},
   email:{type:String,require:true,unique:true},
   password:{type:String,require:true},
   created_At:{type:Date,default:Date.now()},
})


const user=mongoose.model("user",registration);

module.exports=user