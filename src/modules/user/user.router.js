import { Router } from "express";
import * as controller from "./user.controller.js";
import { auth } from "../../middleware/auth.js";


const router = Router();

router.get("/", auth(['admin']), controller.getUsers);
router.get("/:id", auth(['admin']), controller.getUser);
router.put("/:id", auth(['admin', 'user']), controller.updateUser);
router.delete("/:id", auth(['admin', 'user']), controller.deleteUser);







export default router;