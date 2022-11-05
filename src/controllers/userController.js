const userModel = require('../models/userModel')
const validator = require('../validator/validator')
const jwt = require('jsonwebtoken')
const { Auth } = require("two-step-auth");
const e = require('express');
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

        const data = await userModel.create(requestBody)
        console.log(data)
        return res.status(201).send({ status: true, msg: "user successfully created", data: data })


    } catch (err) {
        res.status(500).send({ status: false, msg: err.message });
    }
};
const login = async (req, res) => {
    const requestBody = req.body
    const { email, password } = requestBody
    const user = await userModel.findOne(requestBody)
    if (!user) {
        return res.status(400).send({ status: false, msg: "user not found" })
    }
    console.log(user)
    if (user) {
        const wait = await Auth(email)
        console.log(wait)
        return res.send({ data: wait })
    }
}















module.exports = { createUser, login }