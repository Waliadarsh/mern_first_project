const {Schema,model} = require('mongoose');
// ! Importing Bcrypt for encrypting the data
const bcryptjs = require('bcryptjs');

// ! Creating schema for teacher
let teacherSchema = new Schema({
    name:{
        type:String,
        required: true
    },
    email:{
        type:String,
        required: true,
        unique:true
    },
    password:{
        type:String,
        required:true
    }
},{
    timestamps:true
})


// ! Encrypting password while creating account. Don't use arrow function for when you use this keyword
teacherSchema.pre("save", async function(next){
    let salt = await bcryptjs.genSalt(11);
    this.password = await bcryptjs.hash(this.password,salt)

    //! From 5 and above of mongoose version next() is not required
    // next()
})

// ! comparing password with hashed password.
teacherSchema.methods.compareMyPassword = async function(password){
    return  await bcryptjs.compare(password , this.password )  ;   /// * Sync means it will wait until the process completes before moving on
}

//! Creating Teacher Collection
module.exports= new model("teacher",teacherSchema)