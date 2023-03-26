import mongoose from "mongoose";
import validator from "validator";
import bcrypt from 'bcryptjs'
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
dotenv.config()

// creating userschema
const UserSchema =new mongoose.Schema({
    name:{
        type:String,
        required:[true,'please provoide the name'],
        minlength:3,
        maxlength:20,
        trim:true,
    },
    email:{
        type:String,
        required:[true,'please provoide the email'],
        validate:{
            validator: validator.isEmail,
            message:'please provide a valid email'
        },
        unique:true,
    },
    password:{
        type: String,
        required:[true,'please provoide password'],
        unique:true,
        minlength:6,
        select:false,
        
    },
})
// hashing the password before saving into database
UserSchema.pre('save',async function(){

    if (!this.isModified('password')) return;
    // add new char to passwaord make it more secure
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,salt)
   
})

// defining user method for comparing the password 
UserSchema.methods.comparePassword = async function (candidatePassword) {
    const isMatch = await bcrypt.compare(candidatePassword, this.password);
    return isMatch;
}
// defining user method to create jwt token
UserSchema.methods.createJWT=function (){
    return jwt.sign({id:this._id},process.env.JWT_SECRET,{expiresIn:process.env.JWT_LIFETIME})
}

export default mongoose.model('User',UserSchema);
 