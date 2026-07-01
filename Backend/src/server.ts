import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import orderRoutes from './routes/orderRoutes';
import supportRoutes from './routes/supportRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Restrict CORS to allowed origins only
const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(',').map(o => o.trim()) || ['http://localhost:3000'];
app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error(`Origin ${origin} not allowed by CORS`));
    }
  },
  methods: ['GET', 'POST', 'PUT'],
  credentials: true,
}));

app.use(express.json({ limit: '100kb' }));  // Prevent oversized payloads

// Routes
app.use('/api/orders', orderRoutes);
app.use('/api/support', supportRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'Backend is running correctly' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
