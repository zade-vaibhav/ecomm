const express=require("express");
const registration = require("../Controller/Auth/registration");

const router=express.Router()


router.post("/register",registration)


module.exports=router;