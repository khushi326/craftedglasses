/**
 * Craftedglasses - Database Seed Script
 * Populates MongoDB with initial products and categories.
 * Run: npm run seed
 */
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../../.env') });

import { ensureCatalog } from '../utils/ensureCatalog.js';

const seedDatabase = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/craftedglasses';
    console.log('[Seed] Connecting to MongoDB:', mongoUri);
    await mongoose.connect(mongoUri);
    console.log('[Seed] Connected to MongoDB');

    await ensureCatalog();

    console.log('[Seed] ✅ Database seeding complete!');
    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error('[Seed] ❌ Error seeding database:', error);
    try {
      await mongoose.disconnect();
    } catch {
      // ignore disconnect errors during failure
    }
    process.exit(1);
  }
};

seedDatabase();
