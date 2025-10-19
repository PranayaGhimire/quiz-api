import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const signToken = (user) => 
    jwt.sign({
        sub:user._id,
        role:user.role,
        email:user.email,
        name:user.name
    },process.env.JWT_SECRET,{
        expiresIn: process.env.JWT_EXPIRES
    });

export const register = async (req,res) => {
    try {
        const {name,email,password,role} = req.body;

        const exists = await User.findOne({email});
        if(exists) return res.status(409).json({message:"Email already registered"});

        const hash = await bcrypt.hash(password,10);
        const user = await User.create({
            name,
            email,
            password:hash,
            role
        });
        const token = signToken(user);
        res.status(201).json({
            message:"User registered successfully",
            token,
            data:user
        });
    } catch (error) {
        res.status(500).json({
            message:error.message
        })
    }
};

export const login = async (req,res) => {
    try {
        const {email,password} = req.body;
        const user = await User.findOne({email});
        const isMatch = await bcrypt.compare(password,user.password);
        if(!user || !isMatch)
            return res.status(401).json({ message:"Invalid credentials" });
        const token = signToken(user);
        res.status(201).json({
            message:"User logged in successfully",
            token,
            data:user
        }) 
    } catch (error) {
        res.status(500).json({message:error.message})        
    }
};

export const userInfo = async (req,res) => {
    try {
        res.status(201).json({
            message:"User information fetched successfully",
            data:req.user
        })
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}