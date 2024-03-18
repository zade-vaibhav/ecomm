const express=require("express");
const registration = require("../Controller/Auth/registration");
const login  = require("../Controller/Auth/login");

const router=express.Router()


router.post("/register",registration)

router.post("/login",login)


module.exports=router;