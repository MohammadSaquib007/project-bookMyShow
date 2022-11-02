const  userModel  = require('../models/userModel')
const createUser = async function (req, res) {
    try {
        const requestBody = req.body;

        const { name, email, password, phone } = requestBody;


        const createUserData = await userModel.create(requestBody);
        {
            res
                .status(201)
                .send({
                    status: true,
                    msg: "successfully created",
                    data: createUserData,
                });
        }
    } catch (err) {
        res.status(500).send({ status: false, msg: err.message });
    }
};
module.exports = {createUser}