import express from 'express';
import { createPopular, getPopular } from '../controllers/popularBook.controller.js';

const router = express.Router();
router.post('/', createPopular);
router.get('/', getPopular);
export default router;