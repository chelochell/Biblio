import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import bookRouters from "./routes/bookroutes.js"

dotenv.config()

const app = express();

app.use(express.json())//middleware

app.use("/api/books", bookRouters)

app.listen(5000, () => {
  connectDB()
  console.log("Server started at http://localhost:5000 ");
});