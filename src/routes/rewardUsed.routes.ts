import { Router } from "express";
import { createRewardUsedController, getHistoryRewardController } from "../controllers/rewardUsedController"
import { authMiddleware } from "../middlewares/auth.middleware";


const router = Router()

/**
 * @swagger
 * /api/historyreward:
 *   get:
 *     summary: Get reward usage history
 *     tags: [RewardUsed]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of reward usage history
 */
router.get("/historyreward", authMiddleware, getHistoryRewardController);

/**
 * @swagger
 * /api/rewardused:
 *   post:
 *     summary: Use reward (redeem reward)
 *     tags: [RewardUsed]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateRewardUsedRequest'
 *     responses:
 *       201:
 *         description: Reward used successfully
 *       400:
 *         description: Not enough points or invalid data
 */
router.post("/rewardused", authMiddleware, createRewardUsedController);

export default router