import express from "express"
import { createBook, deleteBook, getBook, updateBook } from "../controllers/bookcontrollers.js";
const router = express.Router();


router.get('/cluster/:clusterId', getBook);
router.post("/", createBook);
router.put("/:id", updateBook);
router.delete("/:id", deleteBook)

export default router;