import express from "express";
import {
  getMe,
  loginController,
  logout,
  registerController,
} from "../controllers/user.controller.js";
import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();

router.post("/register", registerController);
router.post("/login", loginController);
router.post("/logout", logout);
router.get("/me", protectRoute, getMe);

export default router;
