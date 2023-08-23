const { sendOtp } = require('../helper/mailHelper');
const { createOtp } = require('../helper/otpHelper');
const  User = require('../models/user.model');


let genOtp = async (req,res,next)=>{
    try{
        let { email } = req.body;
        let isUserAvailable = await User.findOne({ email });

    if (!isUserAvailable) {
      return res
        .status(500)
        .json({
          error: true,
          message: `User Not Found with given email ${email}`,
        });
    }

    let {hashedotp,otp} = await createOtp()
    let user = await User.findOneAndUpdate(
      { email },
      { hashedotp},
      { new: true, runValidators: true }
    );

    sendOtp(email, otp, user.fullname);

    next()
    }
    catch(err){
        next(err)
    }
}

module.exports = {
    genOtp
}