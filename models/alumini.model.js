const {Schema,model} = require('mongoose');

let aluminiSchema = new Schema({
    name:{
        type:String,
        required:[true,'Name is Required']
    },
    yearofpassout:{
        type:Number,
        minlength:[4,"Year of Pass Out Should be 4 Digit"]
    },
    email:{
        type:String,
        required:[true,"Email is mandatory"]
    },
    department:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        required: [true,"Gender is required"],
        enum:{
            values:['male','female','others'],
            message:"Only male,female and others is required and you have entered {VALUE}"
        }
    },
    profile:{
        type:String,
        required:true
    }
},{
    timestamps: true
})

module.exports = new model("alumini",aluminiSchema)