import { GameResult } from '../models/GameResult.js';

export const saveGameResult = async (req, res) => {
  try {
    const { game, score, details } = req.body;
    if (GameResult.db.readyState === 1) {
      const result = new GameResult({ game, score, details });
      const saved = await result.save();
      return res.status(201).json(saved);
    }
    return res.status(200).json({ game, score, completedAt: new Date() });
  } catch (error) {
    res.status(400).json({ message: 'Error saving game result', error: error.message });
  }
};

export const getGameResults = async (req, res) => {
  try {
    if (GameResult.db.readyState === 1) {
      const results = await GameResult.find().sort({ completedAt: -1 });
      return res.json(results);
    }
    return res.json([]);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching game results', error: error.message });
  }
};
