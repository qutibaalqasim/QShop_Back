import slugify from "slugify";
import categoryModel from "../../../DB/models/category.model.js";
import cloudinary from "../../utils/cloudinary.js";
import productModel from "../../../DB/models/product.model.js";



export const createProduct = async (req, res, next) => {
    const {name, categoryId} = req.body;
    const checkCategory = await categoryModel.findById(categoryId);
    if(!checkCategory){
        return res.status(404).json({message:"category not found"});
    }
    req.body.slug = slugify(name);
    const {secure_url,public_id} = await cloudinary.uploader.upload(
        req.files.mainImage[0].path,
        {folder:`${process.env.App_Name}/products/${name}`}
    );

    req.body.subImages = [];
    if(req.files.subImages){
        for(const file of req.files.subImages){
            const {secure_url,public_id} = await cloudinary.uploader.upload(file.path
                , {folder:`${process.env.App_Name}/products/${name}/subImages`}
            );
            req.body.subImages.push({secure_url, public_id});
        }
    }
    req.body.mainImage = {secure_url, public_id};
    req.body.createdBy = req.id;
    req.body.updatedBy = req.id;
    const product = await productModel.create(req.body);
    return res.status(201).json({message:"success" , product});
    
}

export const getProducts = async (req, res, next) => {
    const products = await productModel.find({}).select('name mainImage price ');
    return res.status(200).json({message:"success" , products});
}

export const getActive = async (req, res, next) => {
    const products = await productModel.find({status: 'active'});
    return res.status(200).json({message:"success" , products});
}

export const getDetails = async (req, res, next) => {
    const {id} = req.params;
    const product = await productModel.findById(id);
    if(!product){
        return res.status(404).json({message:"product not found"});
    }
    return res.status(200).json({message:"success" , product});
}