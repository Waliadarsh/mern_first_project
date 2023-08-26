const express = require('express');
const {addStudent, getSingleStudent, getallStudent, updateStudent, deleteStudent} = require('../controllers/student.controller');
const { auth } = require('../services/authService');


let router = express.Router();

router.post("/addstudent",addStudent)
router.get("/getsinglestudent/:sid",auth,getSingleStudent)
router.get("/getallstudent",getallStudent)
router.put("/updatestudent/:sid",auth,updateStudent)
router.delete("/deletestudent/:sid",auth,deleteStudent)

module.exports= router