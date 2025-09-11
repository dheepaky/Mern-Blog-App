import express from "express";

import {
  createCategory,
  viewcategory,
} from "../controllers/category.controller.js";
const router = express.Router();

router.post("/create-category", createCategory);
router.get("/categories", viewcategory);
// router.delete("/blogs/:id", deleteblog);
// router.put("/blogs/:id", updateblog);
// router.get("/blogs/:id", singleblog);

export default router;
