import blogmodel from "../models/blog.model.js";

export const createblog = async (req, res) => {
  try {
    const { title, img, category, content } = req.body;
    const slug = title.toLowerCase().replace(/ /g, "-");
    const existingBlog = await blogmodel.findOne({ slug });
    if (existingBlog) {
      return res
        .status(400)
        .json({
          message: "Slug already exists. Please choose a different title.",
        });
    }
    const blog = new blogmodel({
      title,
      slug,
      img,
      category,
      content,
    });
    const blogs = await blog.save();
    res.status(201).json(blogs);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const viewblog = async (req, res) => {
  try {
    const blogs = await blogmodel.find();
    res.status(201).json(blogs);
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
    res.status(400).json({ message: error.message });
  }
};

export const deleteblog = async (req, res) => {
  try {
    const blog = await blogmodel.findByIdAndDelete(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    res.status(200).json({ message: "Blog Deleted Successfully" });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const updateblog = async (req, res) => {
  try {
    const { title, img, category, content } = req.body;
    const blog = await blogmodel.findByIdAndUpdate(
      req.params.id,
      {
        title,
        slug,
        img,
        category,
        content,
      },
      { new: true }
    );
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    res.status(200).json(blog);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
