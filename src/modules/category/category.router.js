import { Router } from "express";
import * as controller from "./category.controller.js";
import { auth } from "../../middleware/auth.js";

const router = Router();

router.post('/add', auth(['admin']), controller.addCategory);


export default router;