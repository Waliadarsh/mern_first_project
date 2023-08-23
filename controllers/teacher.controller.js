const { teacherRegisterMail } = require("../helper/mailHelper");
const Teacher = require("../models/teacher.model")
const jwt = require('jsonwebtoken');
require('dotenv').config();

let registerTeacher = async (req, res, next) => {
    try {
        let { name, email, password } = req.body

        // ?returns the document if condition satisfies else return null
        let isTeacherAvailable = await Teacher.findOne({ email });

        if (!isTeacherAvailable) {

            let teacher = await Teacher.create({ name, email, password})
            teacherRegisterMail(email,name)

            let dataTeacher = {
                name: teacher.name,
                email: teacher.email, createdAT: teacher.createdAT, _id: teacher._id
            }

            return res.status(201).json({ error: false, message: "Teacher added successfully", data: dataTeacher })
        }
        res.status(409).json({ error: true, message: "Teacher already exist" })
    }
    catch (err) {
        next(err)
    }
}

let loginTeacher = async (req, res, next) => {
    try {
        let { email, password } = req.body

        let isTeacherAvailable = await Teacher.findOne({ email })

        if (!isTeacherAvailable) {
            return res.status(404).json({ error: true, message: "No teacher found at given email" })
        }

        // ! comparing password with hashed password of database
        let hashedPassword = await isTeacherAvailable.compareMyPassword(password)

        if (hashedPassword) {
            // ! Generating Token for valid user
            let token = jwt.sign({email,name:isTeacherAvailable.name}, process.env.JWT_KEY ,{expiresIn:process.env.JWT_EXPIRESIN});
            return res.status(201).json({ error: false, message: "Login SuccessFull" ,token})
        }
        else {
            return res.status(401).json({ error: true, message: "Invalid password" })
        }
    }
    catch (err) {
        next(err)
    }
}

let getAllTeacher = async (req,res,next)=>{
    try{
        // ! If ther is a token it returns a token prefixed with Bearer else returns undefined
        let authToken = req.headers.authorization;
        // console.log(authToken);
        if(!authToken || !authToken.startsWith("Bearer")){
            return res.status(500).json({error:true,message:"Valid Token Required"})
        }

        let token = authToken.split(" ")[1]
        // console.log(token);

        let data =  jwt.verify(token, "syed123");
        // console.log(data);

        let teacher = await Teacher.find({},{_id:0})
        return res.status(302).json({error:false,message:"Teachers Data Fetched Successfully",data:teacher})
    }
    catch(err){
        next(err)
    }
}

module.exports = {
    registerTeacher,
    loginTeacher,
    getAllTeacher
}