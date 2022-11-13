const userModel = require('../models/userModel')
const userOtpVerificationModel = require('../models/userOtpVerificationModel')
const validator = require('../validator/validator')
const nodemailer = require('nodemailer')
const bcrypt = require("bcrypt")
const createUser = async function (req, res) {
    try {
        const requestBody = req.body;

        const { name, email, password, phone, gender, wallet, role } = requestBody;
        if (!validator.isValidRequestBody(requestBody)) {
            return res.status(400).send({ status: false, msg: "plz provide request body" })
        }
        if (!validator.isValid(name)) {
            return res.status(400).send({ status: false, msg: "plz provide name" })
        }
        if (!validator.isValid(email)) {
            return res.status(400).send({ status: false, msg: "plz provide email" })
        }
        if (!validator.validateEmail(email)) {
            return res.status(400).send({ status: false, msg: "invalid email id" })
        }
        const isEmailAlreadyUsed = await userModel.findOne({ email: email })
        if (isEmailAlreadyUsed) {
            res.status(400).send({ status: false, message: `${email} email address is already registered` })
            return
        }

        if (!validator.isValid(password)) {
            return res.status(400).send({ status: false, msg: "plz provide password" })
        }
        if (!validator.isValid(phone)) {
            return res.status(400).send({ status: false, msg: "plz provide phone no." })
        }
        const isPhoneAlreadyExists = await userModel.findOne({ phone: phone })
        if (isPhoneAlreadyExists) {
            return res.status(400).send({ status: false, msg: `${phone} phone already exists` })
        }

        if (!validator.validatePhone(phone)) {
            return res.status(400).send({ status: false, msg: "invalid phone no." })
        }
        if (!validator.isValid(gender)) {
            return res.status(400).send({ status: false, msg: "plz provide gender" })
        }
        if (!validator.genderValidation(gender)) {
            return res.status(400).send({ status: false, msg: "invalid gender" })
        }
        if (!validator.isValid(role)) {
            return res.status(400).send({ status: false, msg: "plz provide role" })
        }

        const data = await userModel.create(requestBody).then((result) => {
            sendOtp(result, res)
        })
            .catch((err) => {
                console.log(err)
            })
        console.log(data)
        return res.status(201).send({ status: true, msg: "user successfully created", data: data })


    } catch (err) {
        res.status(500).send({ status: false, msg: err.message });

    }

}
//nodemailer stuff
let transporter = nodemailer.createTransport({
    host: "smtp-mail.gmail.com",
    auth: {
        user: "mohammadrehan97@gmail.com",
        pass: "Rehan@1605440055"
    }
})

const sendOtp = async ({ _id, email }, res) => {
    try {
        const otp = `${Math.floor(1000 + Math.random() * 9000)}`
        const mailOptions = {
            from: "mohammadrehan97@gmail.com",
            to: email,
            subject: "Verify your email",
            html: `Enter ${otp}to verify your email address`
        }
        const saltRounds = 10
        const hashedOtp = await bcrypt.hash(otp, saltRounds)
        const newOtpVerification = await new userOtpVerificationModel({
            userId: _id,
            otp: hashedOtp,
            createdAt: Date.now(),
            expiresAt: Date.now() + 3600000

        })
        await newOtpVerification.save()
        transporter.sendMail(mailOptions)
        res.send({ status: 'Pending', message: "verification OTP email sent", data: { userId: _id, email } })
    }
    catch (err) {
        res.status(500).send({ status: false, msg: err.msg })
    }
}
















module.exports = { createUser }