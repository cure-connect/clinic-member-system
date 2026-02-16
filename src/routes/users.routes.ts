import { Router } from "express";
import { createUserController, getUserByIdController, getAllUserController, deleteUserByIdController, createQRById, patchUserController, getMe, getStaffController, importExcelController } from "../controllers/userController";
import { authMiddleware, roleMiddleware, AuthRequest } from "../middlewares/auth.middleware";
import multer from 'multer';

const storage = multer.memoryStorage();
export const upload = multer({ storage });

const router = Router()

/**
 * @swagger
 * /api/me:
 *   get:
 *     summary: Get current logged-in user
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Current user profile
 */
router.get("/me", authMiddleware, getMe);

/**
 * @swagger
 * /api/user:
 *   get:
 *     summary: Get all users
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of users
 */
router.get("/user", authMiddleware, getAllUserController);

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Get user by ID
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User detail
 *       404:
 *         description: User not found
 */
router.get("/users/:id", getUserByIdController);

/**
 * @swagger
 * /api/staff:
 *   get:
 *     summary: Get all staff users
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of staff users
 */
router.get("/staff", authMiddleware, getStaffController);

/**
 * @swagger
 * /api/user/import:
 *   post:
 *     summary: Import users from Excel file
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Users imported successfully
 */
router.post("/user/import", upload.single('file'), authMiddleware, importExcelController);

/**
 * @swagger
 * /api/create:
 *   post:
 *     summary: Create new user
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateUserRequest'
 *     responses:
 *       201:
 *         description: User created successfully
 */
router.post("/create", authMiddleware, createUserController);

/**
 * @swagger
 * /api/createqr/{id}:
 *   post:
 *     summary: Generate QR code for user
 *     tags: [User]
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
 *         description: QR code generated
 */
router.post("/createqr/:id", authMiddleware, createQRById);

/**
 * @swagger
 * /api/update/{id}:
 *   patch:
 *     summary: Update user by ID
 *     tags: [User]
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
 *             $ref: '#/components/schemas/UpdateUserRequest'
 *     responses:
 *       200:
 *         description: User updated successfully
 */
router.patch("/update/:id", authMiddleware, patchUserController);

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Delete user by ID
 *     tags: [User]
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
 *         description: User deleted successfully
 */
router.delete("/users/:id", authMiddleware, deleteUserByIdController);

export default router