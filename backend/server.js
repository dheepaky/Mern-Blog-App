import express from "express";
import dotenv from "dotenv";
import db from "./db/db.js";
import blogrouter from "./routes/blog.route.js";
import categoryrouter from "./routes/category.route.js";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/blog", blogrouter);
app.use("/api/category", categoryrouter);

dotenv.config();
const PORT = process.env.PORT;

app.get("/", (req, res) => {
  res.send("Api works");
});

app.listen(PORT, () => {
  console.log(`Server Running ${PORT}`);
  db();
});
