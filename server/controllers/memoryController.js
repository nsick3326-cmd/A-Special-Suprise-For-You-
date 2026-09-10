import { Memory } from '../models/Memory.js';

export const getMemories = async (req, res) => {
  try {
    if (Memory.db.readyState === 1) {
      const memories = await Memory.find().sort({ createdAt: -1 });
      return res.json(memories);
    }
    return res.json([]);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching memories', error: error.message });
  }
};

export const createMemory = async (req, res) => {
  try {
    if (Memory.db.readyState === 1) {
      const memory = new Memory(req.body);
      const saved = await memory.save();
      return res.status(201).json(saved);
    }
    return res.status(200).json({ ...req.body, _id: Date.now().toString() });
  } catch (error) {
    res.status(400).json({ message: 'Error creating memory', error: error.message });
  }
};
