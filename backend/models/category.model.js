import mongoose from "mongoose";

const categoryschema = mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
});

const categorymodel = mongoose.model("category", categoryschema);

export default categorymodel;
