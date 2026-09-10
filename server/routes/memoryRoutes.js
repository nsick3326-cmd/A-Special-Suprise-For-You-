import express from 'express';
import { getMemories, createMemory } from '../controllers/memoryController.js';

const router = express.Router();

router.get('/', getMemories);
router.post('/', createMemory);

export default router;
