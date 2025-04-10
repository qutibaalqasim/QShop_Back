import { Router } from "express";
import * as controller from "./category.controller.js";
import { auth } from "../../middleware/auth.js";

const router = Router();

router.post('/', auth(['admin']), controller.addCategory);
router.get('/',auth(['admin']), controller.getCategories);
router.get('/:id', controller.getDetails);
router.get('/activeCategories', controller.getActive);
router.delete('/:id', auth(['admin']), controller.removeCategories);
router.put('/:id', auth(['admin']), controller.updateCategory);

export default router;