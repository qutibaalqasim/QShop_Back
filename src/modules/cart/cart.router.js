import { Router } from "express";
import { auth } from "../../middleware/auth.js";
import * as controller from './cart.controller.js';

const router = Router();

router.post('/', auth(['user']), controller.addToCart);
router.get('/', auth(['user']), controller.getCart);
router.delete('/', auth(['user']), controller.deleteFromCart);
router.delete('/clear', auth(['user']), controller.clearCart);


export default router;