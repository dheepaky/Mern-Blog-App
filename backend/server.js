import express from "express";
import dotenv from "dotenv";
import db from "./db/db.js";
import blogrouter from "./routes/blog.route.js";
import categoryrouter from "./routes/category.route.js";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const _dirname = path.dirname(__filename);

dotenv.config();
const app = express();

const __dirname = path.resolve();

app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "Cookie"],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 5000;

app.use("/uploads", express.static(path.join(_dirname, "uploads")));
app.use("/api/blog", blogrouter);
app.use("/api/category", categoryrouter);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../frontend/dist", "index.html"));
  });
}

app.get("/", (req, res) => {
  res.send("API works");
});

app.listen(PORT, () => {
  console.log(`Server Running on port ${PORT}`);
  db();
});
