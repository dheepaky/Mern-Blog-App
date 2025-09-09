import mongoose from "mongoose";

const blogschema = new mongoose.Schema(
  {
    title: {
      type: String,
      require: true,
    },
    slug: {
      type: String,
      require: true,
    },
    img: {
      type: String,
    },
    category: {
      type: String,
    },
    content: {
      type: String,
    },
  },
  { timestamps: true }
);

const blogmodel = mongoose.model("blog", blogschema);

export default blogmodel;
