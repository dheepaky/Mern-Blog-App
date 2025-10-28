import express from "express";
import {
  getMe,
  loginController,
  logout,
  registerController,
  updateProfileImg,
} from "../controllers/user.controller.js";
import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();

router.post("/register", registerController);
router.post("/login", loginController);
router.post("/logout", logout);
router.get("/me", protectRoute, getMe);
router.put("/updateprofile/:id", protectRoute, updateProfileImg);

export default router;
