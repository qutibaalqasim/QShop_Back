import bcrypt from "bcryptjs";
import userModel from "../../../DB/models/user.model.js";


export const register = async (req,res,next)=>{
   const {userName,email,password} = req.body;
   const checkEmail = await userModel.findOne({email});
   if(checkEmail){
    return res.status(404).json({message:"this email already exists!!"});
   }

   const hashedPassword = bcrypt.hashSync(password, parseInt(process.env.SALT_ROUND));
   const user = await userModel.create({userName,email,password:hashedPassword});
    return res.status(201).json({message:"success", user});    
}