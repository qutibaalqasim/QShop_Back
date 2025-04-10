import { Router } from "express";
import * as controller from './products.controller.js'
import { auth } from "../../middleware/auth.js";
import fileUpload, { fileValidation } from "../../utils/multer.js";
import reviewRouter from "./../review/review.router.js";

const router = Router();

router.use('/:productId/reviews', reviewRouter);

router.post('/' , auth(['admin']),fileUpload(fileValidation.image).fields([
{name:'mainImage' , maxCount:1},
{name:'subImages' , maxCount:6}
]), controller.createProduct);
router.get('/',auth(['admin']), controller.getProducts);
router.get('/active', controller.getActive);
router.get('/:id', auth(['admin', 'user']), controller.getDetails);
router.delete('/:id', auth(['admin']) , controller.removeProduct);
router.put('/:id', auth(['admin']) , controller.updateProduct);

export default router;