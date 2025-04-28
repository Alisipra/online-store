import { User } from "../models/user.js";
import  {adminModel}  from "../models/admin.js";
import jwt from "jsonwebtoken"
export const authenticate = async (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    
  
    if (!token) return res.status(401).json({ message: "No token, authorization denied" });
  
    try {
      const decoded = jwt.verify(token, "secure");
      
  
      const admin = await adminModel.findById(decoded.id).select("-password");
      if (admin) {
        req.user = admin;
        req.user.isAdmin = true;
        return next();
      }
  
      const user = await User.findById(decoded.id).select("-password");
      if (user) {
        req.user = user;
        return next();
      }
  
      return res.status(404).json({ message: "User not found" });
  
    } catch (err) {
      
      return res.status(401).json({ message: "Token is not valid" });
    }
  };
  
export const verifyAdmin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
      return next();
    } else {
      return res.status(403).json({ message: "Access denied, admin only" });
    }
  };