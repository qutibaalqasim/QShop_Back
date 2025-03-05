import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
import userModel from "../../../DB/models/user.model.js";
import { sendEmail } from "../../utils/sendEmail.js";


export const register = async (req,res,next)=>{
   const {userName,email,password} = req.body;
   const checkEmail = await userModel.findOne({email});
   if(checkEmail){
    return res.status(404).json({message:"this email already exists!!"});
   }

   const hashedPassword = bcrypt.hashSync(password, parseInt(process.env.SALT_ROUND));
   const user = await userModel.create({userName,email,password:hashedPassword});

   const token = jwt.sign({email}, process.env.CONFIRMEMAIL_SIGNETURE);
   const html = `
    <div>
    <h1>Welcome ${userName}</h1>
    <h2>confirm Email</h2>
    <a href="${req.protocol}://${req.headers.host}/auth/confirmEmail/${token}">confirm your Email Now!!!</a>
    </div>
   `;
   await sendEmail(email, "confirm Email" ,html);
    return res.status(201).json({message:"success", user});    
}

export const confirmEmail = async (req,res,next)=>{
    const {token} = req.params;
    const decoded = jwt.verify(token, process.env.CONFIRMEMAIL_SIGNETURE);
    if(!decoded){
        return res.status(404).json({message:"incorrect email!!!!"});
    }
    const user = await userModel.findOneAndUpdate({email:decoded.email},{confirmEmail:true});
    return res.status(200).json({message:"success"});
}