import express from "express";
import dotenv from "dotenv";
import db from "./db/db.js";
import router from "./routes/blog.route.js";

const app = express();
app.use(express.json());

app.use("/api/blog", router);

dotenv.config();
const PORT = process.env.PORT;

app.get("/", (req, res) => {
  res.send("Api works");
});

app.listen(PORT, () => {
  console.log(`Server Running ${PORT}`);
  db();
});
