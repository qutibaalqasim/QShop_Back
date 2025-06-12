import cartModel from "../../../DB/models/cart.model.js";


export const addToCart = async (req, res, next) => {
    const {productId} = req.body;
    const cart = await cartModel.findOne({userId:req.id});
    if(!cart){
       const newCart = await cartModel.create({
        userId:req.id,
        products:{productId}

    }); 
    return res.status(201).json({message:"success", cart:newCart});
    }

        for(let i = 0; i < cart.products.length; i++){
            if(cart.products[i].productId == productId){
                return res.status(400).json({message:"product already in cart"});
            }
        }

        cart.products.push({productId});
        await cart.save();
    

    return res.status(201).json({message:"succss", cart});
}

export const getCart = async (req, res, next) => {
    const cart = await cartModel.findOne({userId:req.id}).populate("products.productId", "name price mainImage");
    if(!cart){
        return res.status(404).json({message:"cart not found"});
    }
    return res.status(200).json({message:"success", cart});
}

export const deleteFromCart = async (req,res,next) =>{
    const {productId} = req.body;
    const cart = await cartModel.findOne({userId:req.id});
    if(!cart){
        return res.status(404).json({message:"cart not found"});
    }
    const productIndex = cart.products.findIndex(item => item.productId.toString() == productId);
    if(productIndex == -1){
        return res.status(404).json({message:"product not found in cart"});
    }
    cart.products.splice(productIndex, 1);
    await cart.save();
    return res.status(200).json({message:"success", cart});
}

export const clearCart = async (req, res, next) => {
    const cart = await cartModel.findOneAndDelete({userId:req.id});
    if(!cart){
        return res.status(404).json({message:"cart not found"});
    }
    return res.status(200).json({message:"success", cart});
}

export const updateCart = async (req, res, next) => {
    const {productId, quantity} = req.body;
    const cart = await cartModel.findOne({userId:req.id});
    if(!cart){
        return res.status(404).json({message:"cart not found"});
    }
    const productIndex = cart.products.findIndex(item => item.productId.toString() == productId);
    if(productIndex == -1){
        return res.status(404).json({message:"product not found in cart"});
    }
    cart.products[productIndex].quantity = quantity;
    await cart.save();
    return res.status(200).json({message:"success", cart});
}