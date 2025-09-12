import express from "express";
import multer from "multer";
import {
  createblog,
  deleteblog,
  getpostbycategory,
  Searchblog,
  singleblog,
  updateblog,
  viewblog,
} from "../controllers/blog.controller.js";
const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

router.post("/create-blog", upload.single("img"), createblog);
router.get("/blogs", viewblog);
router.delete("/blogs/:id", deleteblog);
router.put("/blogs/:id", updateblog);
router.get("/blogs/:id", singleblog);
router.get("/category/:categoryid", getpostbycategory);
router.get("/search", Searchblog);

export default router;
