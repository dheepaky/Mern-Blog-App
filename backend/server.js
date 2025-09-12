import express from "express";
import dotenv from "dotenv";
import db from "./db/db.js";
import blogrouter from "./routes/blog.route.js";
import categoryrouter from "./routes/category.route.js";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/api/blog", blogrouter);
app.use("/api/category", categoryrouter);

const PORT = process.env.PORT;

if (process.env.NODE_ENV) {
  app.use(express.static(path.join(__dirname, "/frontend/build")));
  app.use("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
  });
}

app.get("/", (req, res) => {
  res.send("Api works");
});

app.listen(PORT, () => {
  console.log(`Server Running ${PORT}`);
  db();
});
