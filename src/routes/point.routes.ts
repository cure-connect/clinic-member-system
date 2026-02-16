import { Router } from "express";
import { getPointByIdController,createPointController, getAllPointController, deletePointsController, getAllHistoryPoint } from "../controllers/pointController";
import { authMiddleware } from "../middlewares/auth.middleware";



const router = Router()
/**
 * @swagger
 * /api/point:
 *   get:
 *     summary: Get all points
 *     tags: [Point]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Success
 */
router.get("/point", authMiddleware, getAllPointController);

/**
 * @swagger
 * /api/point/{id}:
 *   get:
 *     summary: Get point by ID
 *     tags: [Point]
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
 *         description: Success
 */
router.get("/point/:id", authMiddleware, getPointByIdController);

/**
 * @swagger
 * /api/historypoint:
 *   get:
 *     summary: Get all point history
 *     tags: [Point]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Success
 */
router.get("/historypoint", authMiddleware, getAllHistoryPoint);

/**
 * @swagger
 * /api/point:
 *   post:
 *     summary: Create new point
 *     tags: [Point]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreatePointRequest'
 *     responses:
 *       201:
 *         description: Created
 */
router.post("/point", authMiddleware, createPointController);

/**
 * @swagger
 * /api/point/{id}:
 *   delete:
 *     summary: Delete point by ID
 *     tags: [Point]
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
 *         description: Deleted successfully
 */
router.delete("/point/:id", authMiddleware, deletePointsController);

export default router