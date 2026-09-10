import { Message } from '../models/Message.js';

export const createMessage = async (req, res) => {
  try {
    const { sender, message } = req.body;
    if (Message.db.readyState === 1) {
      const msg = new Message({ sender, message });
      const saved = await msg.save();
      return res.status(201).json(saved);
    }
    return res.status(200).json({ sender, message, createdAt: new Date() });
  } catch (error) {
    res.status(400).json({ message: 'Error submitting message', error: error.message });
  }
};

export const getMessages = async (req, res) => {
  try {
    if (Message.db.readyState === 1) {
      const messages = await Message.find().sort({ createdAt: -1 });
      return res.json(messages);
    }
    return res.json([]);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching messages', error: error.message });
  }
};
