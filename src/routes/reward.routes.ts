import { Router } from "express";
import { getAllRewardController ,createRewardController, getRewardByIdController, deleteRewardController, updateRewardByIdController } from "../controllers/rewardController"
import { authMiddleware } from "../middlewares/auth.middleware";


const router = Router()


router.get("/reward", authMiddleware ,getAllRewardController)
router.get("/reward/:id", authMiddleware,getRewardByIdController)
router.post("/reward", authMiddleware,createRewardController)
router.patch("/reward/:id", authMiddleware,updateRewardByIdController)
router.delete("/reward/:id", authMiddleware,deleteRewardController)
export default router