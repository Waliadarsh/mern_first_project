const {connect} = require('mongoose');
require('dotenv').config();

// ! creating database and connecting to it.
connect(process.env.PROD_URL).
then(()=>{
    console.log("Connected to MongoDB");
} ).catch( (err)=>{
    if(err) throw err
})  