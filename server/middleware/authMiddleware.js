import jwt from 'jsonwebtoken';
import { adminModel } from '../models/admin.js';


export const verifyAdmin = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ error: 'Access denied. No token provided' });
        }

        // Extract token
        const token = authHeader.split(" ")[1];
       

        // Verify token using same hardcoded secret
        const decoded = jwt.verify(token, "secure",{ expiresIn:'365d' });
        
        // Fetch admin from DB
        const admin = await adminModel.findById(decoded.id);
        if (!admin || admin.role !== 'admin') {
            return res.status(403).json({ error: 'Admin access required' });
        }

        req.admin = admin;
        next();
    } catch (error) {
        console.error("JWT Verification Error:", error.message);
        res.status(401).json({ error: 'Invalid token' });
    }
};

export default verifyAdmin;