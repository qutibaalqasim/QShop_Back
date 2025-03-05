import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
import { nanoid,customAlphabet } from 'nanoid';
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

export const login = async (req,res,next)=>{
    const {email,password} = req.body;
    const user = await userModel.findOne({email});
    if(!user){
        return res.status(400).json({message:"invalid data!!!!"});
    }
    if(!user.confirmEmail){
        return res.status(400).json({message:"please confirm your email"});
    }
    if(user.status == "inactive"){
        return res.status(400).json({message:"your account is inactive"});
    }
    const checkedPassword = bcrypt.compareSync(password, user.password);
    if(!checkedPassword){
        return res.status(400).json({message:"invalid data!!!!"});
    }

    const token = jwt.sign({id:user._id, userName:user.userName, role:user.role}, process.env.LOGIN_SIGNETURE);
    return res.status(200).json({message:"success", token});
}

export const sendCode = async (req,res,next)=>{
    const {email} = req.body;
    const code = customAlphabet('1234567890abcdefABCDEF', 4);
    const user = await userModel.findOneAndUpdate({email}, {sendCode:code()});  
    if(!user){
        return res.status(404).json({message:"invalid email"});
    }

    const html = `
    <h2>code is ${code()}</h2>
    `;
    await sendEmail(email, "code for resetPassword" ,html);
    return res.status(200).json({message:"success"});
}


export const resetPassword = async (req,res,next)=>{
    const {code,email,newPassword} = req.body;
    const user = await userModel.findOne({email});
    if(!user){
        return res.status(404).json({message:"invalid email"});
    }
    if(code!= user.sendCode){
        return res.status(400).json({message:"invalid code"});
    }

    const hashedPassword = bcrypt.hashSync(newPassword, parseInt(SALT_ROUND));

    user.password = hashedPassword;
    user.sendCode = null;
    await user.save();
    return res.status(200).json({message:"success"});
}