const userModel = require("../models/userModel")
const verifyPhoneOtp = async (req, res, next) => {
    try {
      const { otp, userId } = req.body;
      const user = await User.findById(userId);
      if (!user) {
        next({ status: 400, message: USER_NOT_FOUND_ERR });
        return;
      }
  
      if (user.phoneOtp !== otp) {
        next({ status: 400, message: INCORRECT_OTP_ERR });
        return;
      }
      const token = createJwtToken({ userId: user._id });
  
      user.phoneOtp = "";
      await user.save();
  
      res.status(201).json({
        type: "success",
        message: "OTP verified successfully",
        data: {
          token,
          userId: user._id,
        },
      });
    } catch (error) {
      next(error);
    }
  };

  exports.createJwtToken = (payload) => {
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "12h" });
    return token;
  };
  
  exports.verifyJwtToken = (token, next) => {
    try {
      const { userId } = jwt.verify(token, JWT_SECRET);
      return userId;
    } catch (err) {
      next(err);
    }
  };