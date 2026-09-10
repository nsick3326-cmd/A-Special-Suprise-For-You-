import mongoose from 'mongoose';

const memorySchema = new mongoose.Schema({
  title: { type: String, required: true },
  date: { type: String, required: true },
  year: { type: String, default: "2024" },
  description: { type: String, required: true },
  story: { type: String },
  image: { type: String, required: true },
  category: { type: String, default: 'General' },
  quote: { type: String },
  location: { type: String },
}, { timestamps: true });

export const Memory = mongoose.model('Memory', memorySchema);
