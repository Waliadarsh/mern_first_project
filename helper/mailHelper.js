const nodemailer = require('nodemailer');
require('dotenv').config();

let orgzMail = process.env.EMAIL_ID

let transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: orgzMail,
        pass: process.env.EMAIL_PASS
    }
})

let teacherRegisterMail = async (email,name)=>{
    let mailOptions ={
        from:orgzMail,
        to: email,
        subject: "Thank You For Registering with us ",
        html: `<h1>Hi ${name} you have register successfullly with given mail ${email}</h1>`
    }
    transporter.sendMail(mailOptions, ()=> console.log(`Registering Mail sent for ${name}`))
}

let invitationMail = async (email,name,role)=>{

    let mailOptions = {
        from: orgzMail,
        to: email,
        subject:'Registration Successful!',
        html:`<h1>Thanks For Registring ${name.toUpperCase()} with us <br/>
        Your Account is created as ${role} <br/>
         You can login to access the app</h1>`
    }
    transporter.sendMail( mailOptions, ()=> console.log("Mail sent successfully"));
}

let sendOtp=async (email,otp,name)=>
{
    let mailOptions={
        from:orgzMail,
        to:email,
        subject:"OTP Mail",
        html:`<h1>Hi ${name}, Your OTP for XYZ Application is ${otp}</h1>`
    }
    transporter.sendMail(mailOptions, ()=>{console.log("OTP Sent Successfully")})
}

module.exports= {
    teacherRegisterMail,
    invitationMail,
    sendOtp
}