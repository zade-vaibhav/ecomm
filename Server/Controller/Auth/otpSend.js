const user = require("../../Model/user.js");
const reset_password = require("../../Model/userPasswordOtp.js");
const { v4: uuidv4 } = require("uuid")
const bcrypt = require("bcrypt");
const { reset_password_mail } = require("../../Helper/mail/mail.js");
const jwt=require("jsonwebtoken")
const dotenv=require("dotenv")
dotenv.config()

async function otpSend(req,res){
    const {email}=req.body;

    try{
    const isUser=await user.findOne({email})

    if(!isUser){
        return res.status(401).json({
            success: false,
            message: "email not exist!!"
           
        })
    }else{ 

        const hasOtp=await reset_password.findOne({owner:isUser._id})

        if(hasOtp){
             if(hasOtp.date_expires<Date.now()){
                await reset_password.findOneAndDelete({_id:hasOtp._id})

                 //generate otp
                const otp = String(parseInt(uuidv4().slice(0, 7), 16) % 900000 + 100000);
                //hash otp
                let salt = 10;
                    let hashedOtp = await bcrypt.hash(otp, salt)

                    const result = await reset_password_mail(isUser.email, isUser.name, otp);

                    if(result){
                        let passwordEmailVerify = await reset_password({
                            owner: isUser._id,
                            otp: hashedOtp,
                            date_created: Date.now(),
                            date_expires: Date.now() + 120000
                        })

                        // sending otp to new user and saving new hashed otp value in database
                        await passwordEmailVerify.save();

                        // create token of user credentials
                        const token = await jwt.sign({id:isUser._id},process.env.SECURITY_JWT)

                        res.status(200).json({
                            success:true,
                            user: {
                                token: token
                            },
                            message: "otp is sent to your given eamil successfully"
                        })
                    }else{
                        res.status(400).json({
                            success:false,
                            message: "trobul sending email!!"
                        })
                    }

             }else{
                res.status(400).json({
                    success:false,
                    message: "otp already sent, session is yet to expire"
                })
             }
        }else{

            const otp = String(parseInt(uuidv4().slice(0, 7), 16) % 900000 + 100000);
            //hash otp
            let salt = 10;
                let hashedOtp = await bcrypt.hash(otp, salt)

                const result = await reset_password_mail(isUser.email, isUser.name, otp);

                if(result){
                    let passwordEmailVerify = await reset_password({
                        owner: isUser._id,
                        otp: hashedOtp,
                        date_created: Date.now(),
                        date_expires: Date.now() + 120000
                    })

                    // sending otp to new user and saving new hashed otp value in database
                    await passwordEmailVerify.save();

                    // create token of user credentials
                    const token = await jwt.sign({id:isUser._id},process.env.SECURITY_JWT,{expiresIn: '1h'})

                    res.status(200).json({
                        success:true,
                        user: {
                            token: token
                        },
                        message: "otp is sent to your given eamil successfully"
                    })
                }else{
                    res.status(400).json({
                        success:false,
                        message: "trobul sending email!!"
                    })
                }
        }
    }

    }catch(err){
        res.status(500).json({
            success:false,
            message: err
        })
    }
}

module.exports=otpSend