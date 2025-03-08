import jwt from 'jsonwebtoken';
import userModel from '../../DB/models/user.model.js';


export const auth = (accessRoles = [])=>{

    return async (req, res, next)=>{
        const {token} = req.headers;
        if(!token){
            return res.status(400).json({message:"unauthorized"});
        }
        const decoded = jwt.verify(token, process.env.LOGIN_SIGNETURE);
        if(!decoded){
            return res.status(400).json({message:"invalid token"});
        }
        const user = await userModel.findById(decoded.id);
        if(!accessRoles.includes(user.role)){
            return res.status(400).json({message:"you are not authorized"});   
        }
        req.id = decoded.id;
        next();
    }
}