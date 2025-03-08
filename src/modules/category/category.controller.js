import slugify from 'slugify';
import categoryModel from '../../../DB/models/category.model.js';


export const addCategory = async (req, res, next) => {
    const { name } = req.body;
    req.body.slug = slugify(name);
    req.body.createdBy = req.id;
    req.body.updatedBy = req.id;

    const category = await categoryModel.create(req.body);
    
    return res.status(201).json({message:"success", category});
}

export const getCategories = async (req, res, next) => {
   
   const categories = await categoryModel.find({});
   return res.status(200).json({message:"success" , categories});
}

export const getActive = async (req, res, next) => {
    const categories = await categoryModel.find({status: 'active'});
    return res.status(200).json({message:"success" , categories});
}