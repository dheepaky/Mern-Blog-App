import express from "express";
import {
  createblog,
  deleteblog,
  getpostbycategory,
  singleblog,
  updateblog,
  viewblog,
} from "../controllers/blog.controller.js";
const router = express.Router();

router.post("/create-blog", createblog);
router.get("/blogs", viewblog);
router.delete("/blogs/:id", deleteblog);
router.put("/blogs/:id", updateblog);
router.get("/blogs/:id", singleblog);
router.get("/category/:categoryid", getpostbycategory);

export default router;
