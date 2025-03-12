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

export const getDetails= async (req, res, next) => {
    const {id} = req.params;
    const category = await categoryModel.findById(id);
    if(!category){
        return res.status(404).json({message:"category not found"});
    }

    return res.status(200).json({message:"success", category});
}

export const getActive = async (req, res, next) => {
    const categories = await categoryModel.find({status: 'active'});
    return res.status(200).json({message:"success" , categories});
}

export const removeCategories = async (req, res, next) => {
    const {id} = req.params;
    const category = await categoryModel.findByIdAndDelete(id);
    if(!category){
        return res.status(404).json({message:"category not found"});
    }

    return res.status(200).json({message:"deleted successfully"});

   
}


export const updateCategory = async (req, res, next) => {
    const {id} = req.params;
    const {name} = req.body;
    const userId = req.id;
    const category = await categoryModel.findById(id);
    if(!category){
        return res.status(404).json({message:"category not found"});
    }

    category.name = name;
    category.updatedBy = userId;
    category.slug = slugify(name);
    category.status = req.body.status;
    await category.save();

    return res.status(200).json({message:"updated successfully", category});


}