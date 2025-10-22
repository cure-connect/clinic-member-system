import { Router } from "express";
import { getPointByIdController,createPointController, getAllPointController, deletePointsController, getAllHistoryPoint } from "../controllers/pointController";
import { authMiddleware } from "../middlewares/auth.middleware";



const router = Router()

router.get("/point", authMiddleware,getAllPointController)
router.get("/point/:id", authMiddleware,getPointByIdController)
router.get("/historypoint", authMiddleware ,getAllHistoryPoint)
router.post("/point", authMiddleware,createPointController)
router.delete("/point/:id", authMiddleware,deletePointsController)
export default router