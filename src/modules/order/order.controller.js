import cartModel from "../../../DB/models/cart.model.js"
import couponModel from "../../../DB/models/coupon.model.js";
import orderModel from "../../../DB/models/order.model.js";
import productModel from "../../../DB/models/product.model.js";
import userModel from "../../../DB/models/user.model.js";


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
    let subTotal = 0;
    for(let product of cart.products){
        const checkProduct = await productModel.findOne({
            _id: product.productId,
            stock:{$gte: product.quantity}
        });
        if(!checkProduct){
            return res.status(400).json({message:"product out of stock"});
        }
        //bson to json
        product = product.toObject();
        product.productName = checkProduct.name;
        product.unitPrice = checkProduct.priceAfterDiscount;
        product.finalPrice = product.quantity * checkProduct.priceAfterDiscount;
        subTotal += product.finalPrice;
        finalProducts.push(product);
    }

    const user = await userModel.findById(req.id);
    if(!req.body.address){
        req.body.address = user.address;
    }
    if(!req.body.phone){
        req.body.phoneNumber = user.phoneNumber;
    }
   
    const order = await orderModel.create({
        userId:req.id,
        products: finalProducts,
        couponName:couponName ?? '',
        address:req.body.address,
        phoneNumber: req.body.phoneNumber,
        finalPrice: subTotal
    });

    return res.json(order);
}