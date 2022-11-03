const { Schema,model } = require("mongoose");
const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },

  phone: {
    type: Number,
    required: true,
    trim: true,
    unique: true,
  },
 
  password:{
    type:String,
    required:true,
  },
  gender: {
    type:String,
    enum: ["male", "female", "transgender"],
    required:"gender should be male,female,transgender"
  },
  wallet: {
    type: Number,
    default: 500,
  },
  role: {
    type:String,
    enum: ["user", "admin"],
    required:"role must be user or admin"
  },
}, { timestamps: true });

module.exports = model("userBms", userSchema)
