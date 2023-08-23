const express= require('express')
const { registerTeacher, loginTeacher, getAllTeacher, resentPassword }=require("../controllers/teacher.controller");
const { auth } = require('../services/authService');

let router = express.Router();

router.post("/addteacher",registerTeacher);
router.get("/loginteacher",loginTeacher)
router.get("/getteachers",auth,getAllTeacher)
router.patch("/resetpass",resentPassword)

module.exports=router;