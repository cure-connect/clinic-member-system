import { Router } from "express";
import { createRewardController } from "../controllers/rewardController"

const router = Router()


router.post("/reward", createRewardController)
export default router