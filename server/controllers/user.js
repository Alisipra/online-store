import {User} from "../models/user.js";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

////register new user
export const signup=(
    async (req,res)=>{
        const {name,email,password}=req.body;
        try {
            let existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.status(400).json({ message: "User Already Exists..." });
            }
            let hash=await bcrypt.hash(password,10);
            let user=await User.create({name,email,password:hash});
            res.status(200).json({message:"Signup Successfully...",user})
    
        } catch (error) {
            res.status(400).json({message:"something went wrong"});
        }
 })

///login user
export const login=(async (req,res)=>{
    const {email,password}=req.body;
    try {
        let user=await User.findOne({email});
        if(!user){
            return res.json({message:"User Does not exists...",success:false})
        }
        
        let hashpass=await bcrypt.compare(password,user.password)
        if(!hashpass){
            return res.json({message:"Invalid Credentials...",success:false})
        }
        else{
            const token=await jwt.sign({userToken:user._id},process.env.JWT_Secret,{expiresIn:"365d"});
            res.json({message:"Login successfully...",token})
            
        }
        } catch (error) {
        res.status(400).json({message:"something went wrong..."})
    }
})

// get all the users

export const getAllUser=(async(req,res)=>{

    try {
        const users=await User.find();
        if(!users){
            return res.status(404).json({message:"No Users Exists"})
        }
        res.status(200).json({message:"All The Registered Users...",users})    
    } catch (error) {
        res.json(error.message)
    }
    
})

///profile of user
export const profile=async(req,res)=>{
    
    res.json({message:"user is...",user:req.user});
}