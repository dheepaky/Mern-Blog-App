import categorymodel from "../models/category.model.js";
import slugify from "slugify";

export const createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const slug = slugify(name.toLowerCase().replace(/ /g, "-"));
    const existingCategory = await categorymodel.findOne({ slug });
    if (existingCategory) {
      return res.status(400).json({
        message: "Slug already exists. Please choose a different title.",
      });
    }
    const category = new categorymodel({
      name,
      slug,
    });
    const categories = await category.save();
    res.status(201).json(categories);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const viewcategory = async (req, res) => {
  try {
    const category = await categorymodel.find();
    res.status(201).json(category);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
// export const singleblog = async (req, res) => {
//   try {
//     const blog = await blogmodel.findById(req.params.id);
//     if (!blog) {
//       return res.status(404).json({ message: "Blog not found" });
//     }
//     res.status(201).json(blog);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };

// export const deleteblog = async (req, res) => {
//   try {
//     const blog = await blogmodel.findByIdAndDelete(req.params.id);
//     if (!blog) {
//       return res.status(404).json({ message: "Blog not found" });
//     }
//     res.status(200).json({ message: "Blog Deleted Successfully" });
//   } catch (error) {
//     res.status(404).json({ message: error.message });
//   }
// };

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
