import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './routes/auth.js';
import taskRoutes from './routes/tasks.js';
import auth from './middleware/authMiddleware.js';

dotenv.config();

const app = express();
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true}));
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

app.use('/api/users', authRoutes);
app.use('/api/tasks', taskRoutes);

app.listen(5000, () => console.log('🚀 Server running on port 5000'));
