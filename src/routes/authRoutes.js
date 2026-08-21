import express from "express";
import db from "../db/index.js";
import usersTable from "../db/schema/users.js"
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
const router = express.Router();

router.get("/login",async (req,res)=>{
    const {email,password}=req.body;
    if(!email || !password){
        return res.status(400).json({
            message:"Incorrect Email or Password"
        });
    }
    try{
        const user=await db.usersTable.findFirst({email:email});
    }catch(err){
        console.error(err.message);
        return res.status(err.status||500).json({message:err.message||"Something went wrong!"});
    }
})
router.post("/signup",async(req,res)=>{
    const {firstName,lastName,email,password}=req.body;
    
    if (!firstName || !lastName || !email || !password) {
        return res.status(400).json({
        message: "All fields are required",
        });
    }
    try{
        const saltRounds=10;
        const hashedPassword=await bcrypt.hash(password,saltRounds);
        
        const data = await db.insert(usersTable).values({"first_name":firstName,"last_name":lastName,email,password:hashedPassword}).returning({
            userId:usersTable.id,
            userEmail:usersTable.email
        });
        const user=data[0];
        const token= await jwt.sign(
        {
            userId: user.userId,
            userEmail: user.userEmail
        },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
        );



        return res.status(201).json({
            message:"User created successfully",
            user,
            token
    });

    }catch(err){
        console.error(err);
        return res.status(err?.status||500).json({message:err?.message||"something went wrong"});
    }

});
export default router;