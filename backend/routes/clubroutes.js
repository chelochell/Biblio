import express from "express";
import {createClub, deleteClub, getClub, updateClub} from "../controllers/clubcontroller.js";
const router = express.Router();

router.get("/", getClub);
router.post("/", createClub);
router.put("/:id", updateClub);
router.delete("/:id", deleteClub);

export default router;