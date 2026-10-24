import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://ankityadav08022008_db_user:XzdzmSqkOomiGQ9D@cluster0.z9eb8ev.mongodb.net/loopiit?retryWrites=true&w=majority';

export async function connectDB() {
  try {
    const conn = await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log(`[MongoDB Atlas] Connected successfully to host: ${conn.connection.host} (Database: ${conn.connection.name})`);
    return conn;
  } catch (error) {
    console.error('[MongoDB Atlas] Connection failed:', error.message);
    throw error;
  }
}

export default connectDB;
