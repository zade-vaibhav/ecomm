const userToToken = require("../../Helper/jwt/userToToken");
const { register_greet } = require("../../Helper/mail/mail");
const user = require("../../Model/user");
const bcrypt = require("bcrypt")
const { v4: uuidv4 } = require("uuid")


async function registration(req, res) {
    let { name, email, password } = req.body

    name = name.trim();
    email = email.trim();
    password = password.trim();

    if (name == "" || email == "" || password == "") {

        return res.status(401).json({
            status: "error",
            error: {
                code: "400",
                message: "empty Input feilds!"
            }
        })
    }

    const userData = await user.find({ email })

    if (userData.length) {

        return res.status(401).json({
            status: "error",
            error: {
                code: "400",
                message: "user already present!"
            }
        })

    }
    const salt = 10
    const newPassword = await bcrypt.hash(password, salt)
    const newUser = await user.create({ name, email, password: newPassword })
    await newUser.save()
    await register_greet(name,email)
    // const Token = await userToToken(newUser._id)
    // const otp = String(parseInt(uuidv4().slice(0, 7), 16) % 900000 + 100000);
    // console.log(otp)
    return res.json({
        status: "success",
        user:newUser ,
        message: "User Created Successfully"
    })


}


module.exports = registration