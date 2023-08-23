const {Schema,model} = require('mongoose');

//! creating schema structure for student schema
let  studentSchema = new Schema({
    name:{
        type:String,
        required:[true,"Name is required"],
        minLength:[4,"Name should Contain atleast 4 characters"],
        maxLength :[20,'name can not be more than 20 character']
    },
    age:{
        type:Number,
        required:[true,"age is required"],
        min:[18,"Minimum age should be 18 and you entered {VALUE}"],
        max:[35,"Maximum Age Should Be less then or equal to 35 and you have entered {VALUE}"]
    },
    gender:{
        type:String,
        required:[true,"gender is required"],
        enum:{
            values:['male','female','others'],
            message:"Only male,female and others are alllowed and you have entered ${VALUE}"
        }
    },
    email:{
        type:String,
        required:[true,"Email is required"],
        unique:true
    }

},{
    timestamps: true
})

//! creating collection and importing collection
module.exports=  new model("student",studentSchema);