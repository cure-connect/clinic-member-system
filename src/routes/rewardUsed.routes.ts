import { Router } from "express";
import { createRewardUsedController, getHistoryRewardController } from "../controllers/rewardUsedController"


const router = Router()

router.get("/historyreward", getHistoryRewardController)
router.post("/rewardused", createRewardUsedController)
export default router