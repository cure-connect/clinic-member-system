import { Router } from "express";
import { createRewardUsedController, getHistoryRewardController } from "../controllers/rewardUsedController"
import { authMiddleware } from "../middlewares/auth.middleware";


const router = Router()

router.get("/historyreward", authMiddleware,getHistoryRewardController)
router.post("/rewardused", authMiddleware,createRewardUsedController)
export default router