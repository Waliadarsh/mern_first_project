const Alumini = require('../models/alumini.model');
const {StatusCodes} = require('http-status-codes');
require('dotenv').config();

let addAlumini = async (req,res,next)=>{
    try{

        let {name,yearofpassout,email,gender,department,profile} = req.body;

        let isAluminiAvailable = await Alumini.findOne({email});

        if(isAluminiAvailable){
            return res.status(StatusCodes.FORBIDDEN).json({err:true,message:`Alumini already exist with given ${email}`})
        }

        //! altering the path of file and storing in db
        let port="http://localhost:"+ process.env.PORT;
        // let path=req.file.path.replace("public","");
        let path=req.file.path.split("public")[1];
        let imagePath=port+path

        //! altering the path of file and storing in db

        let alumini = await Alumini.create({name,yearofpassout,email,gender,department,profile:imagePath})

        res.status(StatusCodes.CREATED).json({err:false,message:`Alumini data added with given ${email}`,data:alumini})
    }
    catch(err){
        next(err)
    }
}

let getAluminis = async (req,res,next)=>{
    try{

        let aluminis = await Alumini.find({});

        // console.log(aluminis.length)
        if(!aluminis.length){
            return res.status(StatusCodes.NOT_FOUND).json({err:true,message:`No Alumini Found in Data base`})
        }
        res.status(StatusCodes.OK).json({err:false,message:`Alumini Data Fetched Successfully`,data:aluminis})

    }
    catch(err){
        next(err)
    }
}

module.exports = {
    addAlumini,
    getAluminis
}