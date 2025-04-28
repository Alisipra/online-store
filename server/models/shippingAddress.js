import mongoose from "mongoose";
const addressSchema=new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        require:true
    },
    fullname:{
        type:String,
        require:true
    },
    
    address:{
        type:String,
        require:true,
        unique:true

    },
    
    city:{
        type:String,
        require:true
    },
    
    state:{
        type:String
    },
    
    country:{
        type:String
    },
    
    pincode:{
        type:Number,
        require:true
    },
    phone:{
        type:Number,
        require:true
    },
    createdAt:{
        type:Date,
        default:Date.now
    },

})
export const Address=mongoose.model("address",addressSchema);
