import { Router } from "express";
import { getPointByIdController,createPointController, getAllPointController } from "../controllers/pointController";



const router = Router()

router.get("/point", getAllPointController)
router.get("/point/:id", getPointByIdController)
router.post("/point", createPointController)
export default router