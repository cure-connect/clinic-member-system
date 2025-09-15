import { Router } from "express";
import { loginController, logoutController } from "../controllers/auth.controller";
import { authMiddleware, roleMiddleware, AuthRequest } from "../middlewares/auth.middleware";

const router = Router();

// --- Authentication ---
router.post("/login", loginController);
router.post("/logout", logoutController);

router.get("/common", authMiddleware, (req: AuthRequest, res) => {
  res.json({ message: "Common endpoint", user: req.user });
});

router.get("/admin-only", authMiddleware, roleMiddleware(["admin"]), (req: AuthRequest, res) => {
  res.json({ message: "Admin endpoint", user: req.user });
});

router.get("/manager-endpoint", authMiddleware, roleMiddleware(["manager", "admin"]), (req: AuthRequest, res) => {
  res.json({ message: "Manager endpoint", user: req.user });
});

export default router;
