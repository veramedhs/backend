// config/db.js
import mongoose from 'mongoose';
import { ENV } from './ENV.js';

const connectDB = async () => {
  console.log(ENV.MONGO_URI);
  try {
    const conn = await mongoose.connect(ENV.MONGO_URI);

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    process.exit(1);
  }
};

export default connectDB;
