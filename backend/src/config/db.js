import mongoose from 'mongoose';

/**
 * Connect to MongoDB database using the URI from environment variables.
 * If the connection fails, the process will exit with an error so the user
 * can see the underlying MongoDB compatibility issue.
 */
const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/craftedglasses';
    console.log(`[Database] Attempting to connect to MongoDB at ${mongoURI}...`);
    const conn = await mongoose.connect(mongoURI, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log(`[Database] MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error(`[Database] MongoDB connection error: ${error.message}`);
    // Exit the process so the failure is visible; do NOT fall back to in‑memory DB.
    process.exit(1);
  }
};

export default connectDB;
