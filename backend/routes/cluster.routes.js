import express from "express";
import { createCluster, deleteCluster, getCluster, updateCluster } from "../controllers/cluster.controller.js";

const router = express.Router();
router.post('/', createCluster);
router.get('/', getCluster);
router.put('/:id', updateCluster);
router.delete('/:id', deleteCluster);

export default router;

