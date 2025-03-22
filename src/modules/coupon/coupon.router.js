import { Router } from "express";
import * as  controller from './coupon.controller.js'
import { auth } from "../../middleware/auth.js";


const router = Router();

router.post('/' , auth(['admin']) , controller.createCoupon);



export default router;