const { schema, model } = require("mongoose");
const userSchema = new schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },

  phone: {
    type: Number,
    required: true,
    trim: true,
    unique: true,
  },
  email: {
    type: true,
    required: true,
    unique: true,
  },
  gender: {
    enum: ["male", "female", "transgender"],
  },
  wallet: {
    type: Number,
    default: 500,
  },
  role: {
    enum: ["user", "admin"],
  },
},{timestamps:true});

module.exports=model("userBms" , userSchema)
