import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import memoryRoutes from './routes/memoryRoutes.js';
import gameRoutes from './routes/gameRoutes.js';
import messageRoutes from './routes/messageRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());

// Routes
app.use('/api/memories', memoryRoutes);
app.use('/api', gameRoutes);
app.use('/api/messages', messageRoutes);

// Health Check Endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'HBDY Backend API Server Running ✨' });
});

// Start Server
app.listen(PORT, () => {
  console.log(`✨ HBDY Server listening on port ${PORT}`);
});
