import mongoose from "mongoose";

const categoryschema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

const categorymodel = mongoose.model("category", categoryschema);

export default categorymodel;
