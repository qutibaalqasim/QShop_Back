import slugify from 'slugify';
import categoryModel from '../../../DB/models/category.model.js';


export const addCategory = async (req, res, next) => {
    const { name } = req.body;
    const slug = slugify(name);
    return res.json(slug);
}

export const getCategories = async (req, res, next) => {
   
   const categories = await categoryModel.find({});
   return res.status(200).json({message:"success" , categories});
}