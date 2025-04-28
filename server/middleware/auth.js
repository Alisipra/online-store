import  jwt  from "jsonwebtoken";
import { User } from "../models/user.js";

export const authenticated=async(req,res,next)=>{
    const token=req.header("Auth");
    if(!token){
        return res.json({message:"Login First..."})
    }
    const decode=await jwt.verify(token,"secure",{ expiresIn:'365d' })
    const id=decode.userToken;
    let user=await User.findById(id);
    if(!user){
        return res.json({message:"No User Found..."})
    }
    req.user=user; ////global can be use instead of hardcode
    next();
}