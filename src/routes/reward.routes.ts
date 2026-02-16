import { Router } from "express";
import { getAllRewardController ,createRewardController, getRewardByIdController, deleteRewardController, updateRewardByIdController } from "../controllers/rewardController"
import { authMiddleware } from "../middlewares/auth.middleware";


const router = Router()

/**
 * @swagger
 * /api/reward:
 *   get:
 *     summary: Get all rewards
 *     tags: [Reward]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of rewards
 */
router.get("/reward", authMiddleware, getAllRewardController);

/**
 * @swagger
 * /api/reward/{id}:
 *   get:
 *     summary: Get reward by ID
 *     tags: [Reward]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Reward detail
 *       404:
 *         description: Reward not found
 */
router.get("/reward/:id", authMiddleware, getRewardByIdController);

/**
 * @swagger
 * /api/reward:
 *   post:
 *     summary: Create new reward
 *     tags: [Reward]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateRewardRequest'
 *     responses:
 *       201:
 *         description: Reward created successfully
 */
router.post("/reward", authMiddleware, createRewardController);

/**
 * @swagger
 * /api/reward/{id}:
 *   patch:
 *     summary: Update reward by ID
 *     tags: [Reward]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateRewardRequest'
 *     responses:
 *       200:
 *         description: Reward updated successfully
 *       404:
 *         description: Reward not found
 */
router.patch("/reward/:id", authMiddleware, updateRewardByIdController);

/**
 * @swagger
 * /api/reward/{id}:
 *   delete:
 *     summary: Delete reward by ID
 *     tags: [Reward]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Reward deleted successfully
 *       404:
 *         description: Reward not found
 */
router.delete("/reward/:id", authMiddleware, deleteRewardController);

export default router