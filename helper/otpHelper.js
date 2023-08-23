const bcryptjs = require("bcryptjs");

let createOtp = async ()=>{

    let otp = Math.floor(Math.random()*(899999+100000)).toString();
    let salt = await bcryptjs.genSalt(10);
    let hashedotp = await bcryptjs.hash(otp,salt);
    return {
        hashedotp,
        otp
    }
}


module.exports= {
    createOtp
}