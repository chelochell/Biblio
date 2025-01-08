import express from "express";
import { createUpload, deleteUpload, getUpload, updateUpload } from "../controllers/uploadcontroller.js";
const router = express.Router();

router.get("/", getUpload)
router.post("/", createUpload)
router.put("/:id", updateUpload)
router.delete("/:id",deleteUpload)

export default router;
