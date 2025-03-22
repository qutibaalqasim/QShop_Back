import { Router } from "express";
import * as  controller from './coupon.controller.js'
import { auth } from "../../middleware/auth.js";


const router = Router();

router.post('/' , auth(['admin']) , controller.createCoupon);
router.get('/' , auth(['admin']) , controller.getCoupons);
router.get('/:id', auth(['admin']) , controller.getCouponDetails);
router.get('/active', auth(['admin']) , controller.getActiveCoupons);
router.delete('/:id', auth(['admin']) , controller.removeCoupon);
router.put('/:id', auth(['admin']) , controller.updateCoupon);


export default router;