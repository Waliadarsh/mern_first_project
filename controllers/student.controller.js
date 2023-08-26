//! Importing Collection from model folder
const Student = require('../models/student.model');

// ! Joi Validation
const Joi = require('joi');


// ! Creating Schema for Joi Validation
let studentSchema = Joi.object({
    name: Joi.string().min(4).required().messages({
        "string.base":"Name Must be String",
        "string.min":"Name should contain atleast 4 character",
        "string.empty":"Name is Manadatory"
    }),
    age:Joi.number().required().messages({
        "number.base":"NUmber Must be Numeric only",
        "number.empty":"Number is Manadatory"
    }),
    gender:Joi.string().required().messages({
        "string.base":"Gender Must be String",
        "string.empty":"Gender is Manadatory"
    }),
    email: Joi.string().required().email().messages({
        "string.base":"Email Must be String",
        "string.empty":"Email is Manadatory"
    })
})

// ! creating method to adding the student
let addStudent = async (req,res,next)=>{

    try{
        let {name,age,gender,email} = req.body;

        // ! validating use validate method of Joi.studentSchema
        let {value,error}= studentSchema.validate({name,age,gender,email})
        if(error){
            return  res.status(400).json({err:true,message:error.message})

        }
        else{
             // ! writing a query to add the data and return the added data.
            let  newStudent= await Student.create({name,age,gender,email})
            res.status(201).json({error:false,message:"Student added successfully",data:newStudent})
        }
    }
    catch(err){
        next(err)
    }
}


let getSingleStudent = async (req,res,next)=>{

    try{
        let {sid} = req.params;

    //! findById methods return null if their no matching data else return matched data.

    let singleStudent = await Student.findById(sid);
    // let singleStudent = await Student.findOne({_id:sid});

    // console.log(singleStudent);
    //!checking wether student data is avaliable or not.

    if(!singleStudent){
        return res.status(404).json({error:true,message:`Student not found for given ${sid}`,data:null})
    }


    res.status(302).json({error:false,message:`Student with given id ${sid} found `,data:singleStudent})
    }
    catch(err){
        next(err)
    }
}

let getallStudent = async (req,res,next)=>{

    try{
        let {name,gender,sort,fields,page,limit} =req.query;
        let queryObject = {};
        if(name){
            queryObject.name=name;
            // queryObject.name = {$regex:name,$options:"i"}
        }
        if(gender){
            queryObject.gedner=gender;
        }

        // ! writing a query to find all the documnets in the collection and don't use await keyword bcz it waits till it gets response ans allows others line to execute.
    let allStudent =   Student.find(queryObject)

    if(sort){
        allStudent = allStudent.sort(sort)
    }else{
        allStudent = allStudent.sort("createdAt")
    }

    if(fields){
        let splitFields = fields.split(",").join(" ")
        allStudent = allStudent.select(splitFields+" -_id")
    }

    if(!page && !limit){
        allStudent = await allStudent;
        return res.status(302).json({error:false,count:allStudent.length,
            message:"Student data found",data:allStudent })
    }
    // ! Pagination Start
        let newPage = page || 1;
        let newLimit = limit || 4
        // let newSkip = (newPage-1)*4
        let newSkip = (newPage-1)*newLimit
    // ! Pagination ends

    allStudent = await allStudent.skip(newSkip).limit(newLimit);
    res.status(302).json({error:false,count:allStudent.length,
        message:"Student data found",data:allStudent })
    }
    catch(err){
        next(err)
    }
}

let updateStudent = async (req,res,next)=>{

    try{
        let {name,age,gender,email} = req.body;
        let {sid} = req.params;

        let singleStudent= await Student.findById(sid);

        // ! checking whether student is avaliable or not
        if(!singleStudent){

            return res.status(404).json({error:true,message:`Student not found for given ${sid}`,data:null})
        }

        let updatedStudent = await Student.findOneAndUpdate({_id:sid},{name,age,gender,email,runValidators:true});

        // res.status(200).json({error:false,message:`${updateStudent.name.toUpperCase()} age Updated from ${singleStudent.age} to ${updateStudent.age}`})
        res.status(200).json({error:false,message:`${updatedStudent.name} data updated sucesfully`,data:updatedStudent})
    }
    catch(err){
        next(err)
    }


}

let deleteStudent= async(req,res,next)=>{

    try{
        let {sid} = req.params;

    let isAvailable = await Student.findById(sid);

    //! checking whether student is avaliable or not
    if(!isAvailable){
        return res.status(404).json({error:true,message:`No student found with given id: ${sid}`,data:null})
    }

    let deleteStudent = await Student.findOneAndDelete({_id:sid})

    res.status(200).json({error:false,message:`Student Deleted Successfully with id: ${deleteStudent._id}`,data:deleteStudent})
    }
    catch(err){
        next(err)
    }

}

module.exports= {addStudent,getSingleStudent,getallStudent,updateStudent,deleteStudent}