import categorymodel from "../models/category.model.js";
import blogmodel from "../models/blog.model.js";
import slugify from "slugify";
import cloudinary from "cloudinary";

export const createblog = async (req, res) => {
  try {
    const { title, category, content } = req.body;
    let { img } = req.body;

    const slug = slugify(title.toLowerCase().replace(/ /g, "-"));
    const existingBlog = await blogmodel.findOne({ slug });
    if (existingBlog) {
      return res.status(400).json({
        message: "Slug already exists. Please choose a different title.",
      });
    }
    // cloudinary
    if (img) {
      const uploadedResponse = await cloudinary.uploader.upload(img, {
        folder: "/cloudinary-demo",
      });
      console.log(uploadedResponse);

      img = uploadedResponse.secure_url;
    }

    const blog = new blogmodel({
      title,
      img,
      slug,
      category,
      content,
      author: req.user._id, //authUser
    });
    const blogs = await blog.save();
    res.status(201).json(blogs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const viewblog = async (req, res) => {
  try {
    const blogs = await blogmodel.find().sort({ createdAt: -1 });
    res.status(200).json(blogs);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
export const singleblog = async (req, res) => {
  try {
    const blog = await blogmodel.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    res.status(201).json(blog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteblog = async (req, res) => {
  try {
    const blogId = req.params.id;
    const blog = await blogmodel.findById(blogId);
    if (!blog) {
      return res.status(400).json({ message: "blog not found" });
    }
    if (blog.author.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not allowed to delete" });
    }
    await blogmodel.findByIdAndDelete(blogId);

    res.status(200).json({ message: "Blog Deleted Successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateblog = async (req, res) => {
  try {
    const { title, img, category, content } = req.body;
    const slug = slugify(title.toLowerCase().replace(/ /g, "-"));
    const blogId = req.params.id;
    const blog = await blogmodel.findById(blogId);
    if (!blog) {
      return res.status(400).json({ message: "blog not found" });
    }
    if (blog.author.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not allowed to delete" });
    }

    await blogmodel.findByIdAndUpdate(
      blogId,
      {
        title,
        slug,
        img,
        category,
        content,
      },
      { new: true }
    );

    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// get blog by category id

export const getpostbycategory = async (req, res) => {
  try {
    const categoryid = req.params.categoryid;
    // validate
    const categoryexist = await categorymodel.findById(categoryid);

    if (!categoryexist) {
      return res.status(404).json({ message: "invalid category" });
    }
    // fetch post
    const blogs = await blogmodel
      .find({ category: categoryid })
      .populate("category", "name")
      .sort({ createdAt: -1 });
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// search

export const Searchblog = async (req, res) => {
  try {
    const { query } = req.query; // ?query=javascript
    if (!query) {
      return res.json([]);
    }

    const blogs = await blogmodel
      .find({
        $or: [
          { title: { $regex: query, $options: "i" } },
          { content: { $regex: query, $options: "i" } },
        ],
      })
      .limit(5);
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ message: "Error searching blogs", error });
  }
};
