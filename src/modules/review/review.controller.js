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

export const getReviews = async (req, res, next) => {
    const {productId} = req.params;

    const reviews = await reviewModel.find({ productId }).populate("createdBy", "name email");

    if (!reviews || reviews.length === 0) {
        return res.status(404).json({ message: "No reviews found for this product" });
    }

    return res.status(200).json({ message: "Reviews retrieved successfully", reviews });
}

export const updateReview = async (req, res, next) => {
    const userId = req.id;
    const {reviewId} = req.params;
    const {comment, rating} = req.body;

    const review = await reviewModel.findOneAndUpdate(
        { _id: reviewId, createdBy: userId },
        { comment, rating },
        { new: true }
    );

    if (!review) {
        return res.status(404).json({ message: "Review not found or you are not authorized to update it" });
    }

    return res.status(200).json({ message: "Review updated successfully", review });
}

export const deleteReview = async (req, res, next) => {
    const userId = req.id;
    const {reviewId} = req.params;

    const review = await reviewModel.findOneAndDelete({ _id: reviewId, createdBy: userId });

    if (!review) {
        return res.status(404).json({ message: "Review not found or you are not authorized to delete it" });
    }

    return res.status(200).json({ message: "Review deleted successfully" });
}