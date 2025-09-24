import { Router } from "express";
import { getAllRewardController ,createRewardController, getRewardByIdController, deleteRewardController, updateRewardByIdController } from "../controllers/rewardController"


const router = Router()


router.get("/reward", getAllRewardController)
router.get("/reward/:id", getRewardByIdController)
router.post("/reward", createRewardController)
router.patch("/reward/:id", updateRewardByIdController)
router.delete("/reward/:id", deleteRewardController)
export default router