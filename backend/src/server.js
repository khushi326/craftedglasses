import dotenv from 'dotenv';
import app from './app.js';
import connectDB from './config/db.js';
import { ensureCatalog } from './utils/ensureCatalog.js';

dotenv.config();

const PORT = parseInt(process.env.PORT || '5002', 10);

const startServer = async () => {
  await connectDB();
  await ensureCatalog();

  const server = app.listen(PORT, () => {
    console.log(`[Server] Craftedglasses backend running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
    console.log(`[Server] Healthcheck: http://localhost:${PORT}/api/health`);
  });

  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.error(`[Server] Port ${PORT} is already in use. Please change PORT in .env or stop the other process.`);
    } else {
      console.error('[Server] Server error:', err);
    }
  });

  process.on('unhandledRejection', (err) => {
    console.error(`[Server] Unhandled Rejection: ${err.message}`);
  });
};

startServer();
