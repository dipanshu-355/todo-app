import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './routes/auth.js';
import taskRoutes from './routes/tasks.js';
import auth from './middleware/authMiddleware.js';

dotenv.config();

const app = express();
const allowedOrigins = [
  'https://todo-app-ebon-kappa.vercel.app', // ✅ Remove trailing slash
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
  })
);
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

app.use('/api/users', authRoutes);
app.use('/api/tasks', taskRoutes);

app.listen(5000, () => console.log('🚀 Server running on port 5000'));
