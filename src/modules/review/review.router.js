import { Router } from "express";
import * as controller from "./review.controller.js";
import { auth } from "../../middleware/auth.js";



const router = Router({mergeParams: true});

router.post("/", auth(['user']), controller.createReview);
router.get("/", auth(['user']), controller.getReviews);
router.put("/:reviewId", auth(['user']), controller.updateReview);
router.delete("/:reviewId", auth(['user']), controller.deleteReview);


export default router;