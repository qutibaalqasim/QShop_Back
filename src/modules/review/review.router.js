import { Router } from "express";
import * as controller from "./review.controller.js";
import { auth } from "../../middleware/auth.js";



const router = Router({mergeParams: true});

router.post("/", auth(['user']), controller.createReview);


export default router;