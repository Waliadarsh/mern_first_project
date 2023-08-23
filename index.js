const express = require('express');
require('dotenv').config();
require('./adapter/connectiondb');
// *********************************************************
// ! Improting Student Router
const studentRouter = require('./routers/student.routers');

// ! Improting Teacher Router
const teacherRouter = require('./routers/teacher.router');

// ! Improting User Router
const userRouter =require('./routers/user.router');
// *********************************************************

// ! app creation
let app = express();

// ! to convert the javascript object to json if not the result will be undefined.
app.use(express.json());

// *********************************************************
// ! Student Router
app.use("/api/student",studentRouter)

// ! Teacher Router
app.use("/api/teacher",teacherRouter)

//! User Router
app.use("/api/user",userRouter)

// *********************************************************
//! Page not found middleware
app.use("*",(req,res,next)=>{
    res.status(404).json({error:true,message:"Page Not Found"})
})

// ! Error Handling Middleware
app.use( (err,req,res,next)=>{
    res.status(400).json({error:true,message:err.message,data:"ok"})
} )

// **********************************************************
// ! creating a server
let PORT = process.env.PORT;
app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
})
