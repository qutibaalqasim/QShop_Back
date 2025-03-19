import { Router } from "express";
import * as controller from './products.controller.js'
import { auth } from "../../middleware/auth.js";
import fileUpload, { fileValidation } from "../../utils/multer.js";

const router = Router();

router.post('/' , auth(['admin']),fileUpload(fileValidation.image).fields([
{name:'mainImage' , maxCount:1},
{name:'subImages' , maxCount:6}
]), controller.createProduct);



export default router;