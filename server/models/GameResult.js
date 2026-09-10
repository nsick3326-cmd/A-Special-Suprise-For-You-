import mongoose from 'mongoose';

const gameResultSchema = new mongoose.Schema({
  game: { type: String, required: true },
  score: { type: Number, required: true },
  details: { type: Object, default: {} },
  completedAt: { type: Date, default: Date.now }
});

export const GameResult = mongoose.model('GameResult', gameResultSchema);
