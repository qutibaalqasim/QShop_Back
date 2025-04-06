import orderModel from "../../../DB/models/order.model.js";
import reviewModel from "../../../DB/models/review.model.js";


export const createReview = async (req, res, next) => {
    const userId = req.id;
    const {productId} = req.params;
    const {comment, rating} = req.body;

    const order = await orderModel.findOne({
        userId,
        status: "delivered",
        "products.productId": productId
    });
    if (!order) {
        return res.status(404).json({ message: "Order not found or not delivered yet" });
    }

    const review = await reviewModel.create({
        comment,
        rating,
        createdBy: userId,
        productId
    });

    if(!review){
        return res.status(400).json({ message: "Failed to create review" });
    }
    return res.status(201).json({ message: "Review created successfully", review });
}