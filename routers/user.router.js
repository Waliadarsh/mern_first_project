const express = require('express');
const {createUser, loginUser, userverification, resendotp} = require('../controllers/user.controller');
const { genOtp } = require('../services/otpService');

let router =  express.Router()

router.post("/adduser",createUser)
router.post("/loginuser",genOtp,loginUser)
router.post("/userverification",userverification)
router.post("/resendotp",genOtp,resendotp)


module.exports = router