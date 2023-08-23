const { string } = require('joi');
const {Schema,model} = require('mongoose');

let userSchema = new Schema({
    fullname:{
        type:String,
        required:[true,"fullname is mandatory"]
    },
    email:{
        type:String,
        required:[true,"email is mandatory"]
    },
    role:{
        type:String,
        required:[true,"role is mandatory"],
        enum:{
            values:["teacher","student","admin"],
            message:"Only teacher,student and admin are allowed but you have entered {VALUE}"
        }
    },
    hashedotp:{
        type:String,
        required:[true,"OTP is mandatory"],
        default:"null"
    }
},{timestamps:true})

module.exports = new model("user",userSchema)


