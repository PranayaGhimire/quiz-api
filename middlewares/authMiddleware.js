import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protect = async (req,res,next) => {
    try {
        const auth = req.headers.authorization;
        const token = auth.startsWith("Bearer ") ? auth.slice(7) : null;
        if (!token) return res.status(401).json({message:"Missing or invalid token"});

        const payload = jwt.verify(token,process.env.JWT_SECRET);
        const user = await User.findById(payload.sub);
        if (!user) return res.status(401).json({message:"User no longer exists"});
        req.user=user;
        next();
    } catch (error) {
        res.status(401).json({message:"Unauthorized"});
    }
};

export const allowRole = async (req,res,next) => {
    if(!req.user) return res.status(401).json({ message: "Unauthorized" });
    if(req.user.role !== 'admin')
        return res.status(403).json({ message:"You don't have permission" });
    next();
};