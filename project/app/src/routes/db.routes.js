import { Router } from "express";
import * as dbController from "../controllers/db.controllers"
import * as middlewares from "../middlewares/index"

const router=Router()

router.post("/updateUsername", [middlewares.verifyJwtToken, middlewares.verifyUser], dbController.updateUsername)

export default router




