import mongoose, { Schema, SchemaType } from "mongoose";

const blogschema = new mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
    img: {
      type: String,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "category",
    },
    content: {
      type: String,
    },
  },
  { timestamps: true }
);

const blogmodel = mongoose.model("blog", blogschema);

export default blogmodel;
