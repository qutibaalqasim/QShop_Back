import couponModel from "../../../DB/models/coupon.model.js"


export const createCoupon = async (req,res,next)=>{
    const {name} = req.body;
   if(await couponModel.findOne({name:name})){
      return res.status(409).json({message:"this coupon name already exists!!"});
   }

   req.body.createdBy = req.id;
   req.body.updatedBy = req.id;

   const coupon = await couponModel.create(req.body);
   return res.status(201).json({message:"success" , coupon});

}
export const getCoupons = async (req,res,next)=>{
    const coupons = await couponModel.find({});
    return res.status(200).json({message:"success" , coupons});
}

export const getCouponDetails= async (req, res, next) => {
    const {id} = req.params;
    const coupon = await couponModel.findById(id);
    if(!coupon){
        return res.status(404).json({message:"coupon not found"});
    }

    return res.status(200).json({message:"success", coupon});
}

export const updateCoupon= async (req, res, next) => {
    const {id} = req.params;
    const {name} = req.body;
    const coupon = await couponModel.findById(id);
    if(!coupon){
        return res.status(404).json({message:"coupon not found"});
    }

    const checkName = await couponModel.findOne({name});
    if(checkName){
        return res.status(409).json({message:"this coupon name already exists!!"});
    }

    coupon.name = name;
    coupon.updatedBy = req.id;
    coupon.createdBy = req.id;
    coupon.status = req.body.status;
    await coupon.save();
    return res.status(200).json({message:"success", coupon});
}