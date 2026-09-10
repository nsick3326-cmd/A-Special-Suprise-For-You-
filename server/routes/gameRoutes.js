import express from 'express';
import { saveGameResult, getGameResults } from '../controllers/gameController.js';

const router = express.Router();

router.get('/', getGameResults);
router.post('/game-results', saveGameResult);

export default router;
