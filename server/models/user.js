import mongoose from "mongoose";

const userSchema=mongoose.Schema({
    name:{
        type:String,
        required:true  
    },
    isAdmin: {
        type: Boolean,
        default: false,
      },
    email:{
        type:String,
        required:true,
        
    },
    password:{
        type:String,
        required:true,
    },
    createdAt:{
        type:Date,
        default:Date.now()
    }
    
})

export const User=mongoose.model("User",userSchema);