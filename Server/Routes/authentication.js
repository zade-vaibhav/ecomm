const express=require("express");
const registration = require("../Controller/Auth/registration");
const login  = require("../Controller/Auth/login");
const otpSend = require("../Controller/Auth/otpSend");


const router=express.Router()


router.post("/register",registration)

router.post("/login",login)

router.post("/resetpassword/email/otp",otpSend)


module.exports=router;