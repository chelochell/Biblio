import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import bookRouters from "./routes/bookroutes.js"

dotenv.config()

const app = express();
const PORT = process.env.PORT || 5000

app.use(express.json())//middleware

app.use("/api/books", bookRouters)

app.listen(PORT, () => {
  connectDB()
  console.log("Server started at http://localhost:" + PORT);
});