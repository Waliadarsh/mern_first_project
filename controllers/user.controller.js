const { invitationMail } = require("../helper/mailHelper");
const User = require("../models/user.model");
const bcryptjs = require("bcryptjs");

let createUser = async (req, res, next) => {
  try {
    let { fullname, email, role } = req.body;

    let isUserAvaliable = await User.findOne({ email });

    // ! if({}) ==> always return true and if(undefined) is false.
    if (isUserAvaliable) {
      return res.status(500).json({
          error: true,
          message: `User Already Exists with given mail ${email}`,
        });
    }

    let user = await User.create({ fullname, email, role });

    invitationMail(email, fullname, role);

    res.status(201).json({
      error: false,
      message: "User Created Successfully",
      data: {
        name: user.fullname,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    next(err);
  }
};

let loginUser = async (req, res, next) => {
  try {

    let {email} =  req.body;
    return res.status(201).json({ error: false, message: `User Login Successfully through ${email}`});
  }
  catch (err) {
    next(err);
  }
};

let userverification = async (req, res, next) => {
  try {
    let { email, otp } = req.body;

    let isUserAvailable = await User.findOne({ email });

    if (!isUserAvailable) {
      return res.status(500).json({
          error: true,
          message: `User is not found with given email ${email}`,
        });
    }

    let isTrue = await bcryptjs.compare(otp, isUserAvailable.hashedotp);

    isTrue
      ? res.status(200).json({ error: false, message: "OTP Verified Successfully" })

      : res.status(500).json({ error: true, message: "OTP Verification Failed!!!!" });
  }catch (err) {
    next(err);
  }
};

let resendotp = async (req,res,next)=>{
  try{
    let {email} = req.body;
    return res.status(201).json({ error: false, message: `OTP Sent for the registered ${email}`});
  }
  catch(err){
    next(err)
  }
}

module.exports = {
  createUser,
  loginUser,
  userverification,
  resendotp
};
