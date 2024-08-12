import { Router } from "express";
import * as authController from "../controllers/auth.controllers"
import * as middlewares from "../middlewares/index"

const router=Router()

router.post("/signIn", authController.signIn)
router.post("/signUp", [middlewares.verifyRole], authController.signUp)
router.post("/setUsernamePassword", [middlewares.verifyJwtToken, middlewares.verifyUser], authController.setUsernamePassword)

export default router




