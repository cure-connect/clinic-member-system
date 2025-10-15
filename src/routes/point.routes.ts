import { Router } from "express";
import { getPointByIdController,createPointController, getAllPointController, deletePointsController, getAllHistoryPoint } from "../controllers/pointController";



const router = Router()

router.get("/point", getAllPointController)
router.get("/point/:id", getPointByIdController)
router.get("/historypoint", getAllHistoryPoint)
router.post("/point", createPointController)
router.delete("/point/:id", deletePointsController)
export default router