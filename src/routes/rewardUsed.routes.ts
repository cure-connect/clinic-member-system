import { Router } from "express";
import { createRewardUsedController } from "../controllers/rewardUsedController"


const router = Router()


router.post("/rewardused", createRewardUsedController)
export default router