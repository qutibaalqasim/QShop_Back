import cartModel from "../../../DB/models/cart.model.js"
import couponModel from "../../../DB/models/coupon.model.js";
import productModel from "../../../DB/models/product.model.js";


export const createOrder = async (req, res, next) => {
    const {couponName} = req.body;
    const cart = await cartModel.findOne({userId : req.id});
    if(!cart){
        return res.status(404).json({message:"cart not found"});
    }
    if(couponName){
        const coupon = await couponModel.findOne({name: couponName});
        if(!coupon){
            return res.status(404).json({message:"coupon not found"});
        }

        if(coupon.expireDate <= new Date()){
            return res.status(400).json({message:"coupon expired"});
        }

        if(coupon.usedBy.includes(req.id)){
            return res.status(400).json({message:"coupon already used"});
        }
    }

    const finalProducts = [];
    for(let product of cart.products){
        const checkProduct = await productModel.findOne({
            _id: product.productId,
            stock:{$gte: product.quantity}
        });
        console.log(checkProduct);
    }

    return res.json(cart);
}