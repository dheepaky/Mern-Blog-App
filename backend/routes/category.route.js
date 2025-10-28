import express from "express";

import {
  createCategory,
  deleteCategories,
  viewcategory,
} from "../controllers/category.controller.js";
import protectRoute from "../middleware/protectRoute.js";
const router = express.Router();

router.post("/create-category",protectRoute, createCategory);
router.get("/categories", viewcategory);
router.delete("/:id", protectRoute, deleteCategories);
// router.put("/blogs/:id", updateblog);
// router.get("/blogs/:id", singleblog);

export default router;
