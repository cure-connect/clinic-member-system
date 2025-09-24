import { Router } from "express";
import { getPointByIdController,createPointController, getAllPointController, deletePointsController } from "../controllers/pointController";



const router = Router()

router.get("/point", getAllPointController)
router.get("/point/:id", getPointByIdController)
router.post("/point", createPointController)
router.delete("/point/:id", deletePointsController)
export default router