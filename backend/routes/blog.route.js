import express from "express";
import {
  createblog,
  deleteblog,
  getpostbycategory,
  Searchblog,
  singleblog,
  updateblog,
  viewblog,
} from "../controllers/blog.controller.js";
import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();
// import multer from "multer";
// const storage = multer.memoryStorage();
// const upload = multer({ storage });

router.post("/create-blog", protectRoute, createblog);
router.get("/blogs", viewblog);
router.delete("/blogs/:id", protectRoute, deleteblog);
router.put("/blogs/:id", protectRoute, updateblog);
router.get("/blogs/:id", singleblog);
router.get("/category/:categoryid", getpostbycategory);
router.get("/search", Searchblog);

export default router;
