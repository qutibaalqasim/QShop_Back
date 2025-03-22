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