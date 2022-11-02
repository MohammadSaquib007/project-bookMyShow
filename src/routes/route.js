const { Router } = require("express")
const router = Router()
const userController = require('../controllers/userController')
router.post("/register",userController.createUser)
module.exports= router