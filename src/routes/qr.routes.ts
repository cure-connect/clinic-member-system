import { Router } from "express";
import { generateQRController } from "../controllers/qrController"

const router = Router()


router.post("/genqr", generateQRController)
export default router