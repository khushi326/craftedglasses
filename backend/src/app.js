import express from 'express';
import cors from 'cors';
import routes from './routes/index.js';
import { notFoundHandler, errorHandler } from './middleware/errorHandler.js';

const app = express();

const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  'https://craftedglasses.vercel.app',
  process.env.CLIENT_URL,
].filter(Boolean);

const isAllowedOrigin = (origin) => {
  if (!origin) return true;
  if (allowedOrigins.includes(origin)) return true;
  try {
    const { hostname, protocol } = new URL(origin);
    if (protocol !== 'https:') return false;
    // Vercel production alias and preview deployments
    if (hostname === 'craftedglasses.vercel.app') return true;
    if (hostname.endsWith('.vercel.app') && hostname.includes('craftedglasses')) return true;
    return false;
  } catch {
    return false;
  }
};

app.use(cors({
  origin: (origin, callback) => {
    if (isAllowedOrigin(origin) || process.env.NODE_ENV !== 'production') {
      return callback(null, true);
    }
    return callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Root welcome route
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to Craftedglasses Backend API Server',
    environment: process.env.NODE_ENV || 'development',
    endpoints: {
      health: '/api/health',
      api: '/api',
    },
  });
});

// API Routes
app.use('/api', routes);

// Error Handling Middleware
app.use(notFoundHandler);
app.use(errorHandler);

export default app;
