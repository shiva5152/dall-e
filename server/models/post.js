import mongoose from "mongoose";

const PostSchema =new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    prompt:{
        type:String,
        required:true
    },
    photo:{
        type:String,
        required:true
    },
    userId:{
        type:mongoose.Types.ObjectId,
        ref:"User"
    }
})

export default mongoose.model('Post',PostSchema);