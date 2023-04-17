import { Router } from "express";
import {adminToken,login, userLogin} from "./controller.js";
import { UserLoginBodyMiddleware } from "../../middlewares/validation.middleware.js";

const router=Router()

router.get("/pass/code/:token",adminToken)
router.post("/admin/login",login)
router.post("/users/login",UserLoginBodyMiddleware,userLogin)
export default router