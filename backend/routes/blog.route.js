import express from "express";
import {
  createblog,
  deleteblog,
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

export default router;
