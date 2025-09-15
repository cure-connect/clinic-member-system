"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("../controllers/auth.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const router = (0, express_1.Router)();
router.post("/login", auth_controller_1.loginController);
router.post("/logout", auth_controller_1.logoutController);
router.get("/profile", auth_middleware_1.authMiddleware, (req, res) => {
    res.json({ message: "This is your profile", user: req.user });
});
exports.default = router;
