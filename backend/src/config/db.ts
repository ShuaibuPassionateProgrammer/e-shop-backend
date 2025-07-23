import mongoose from "mongoose";


// Connect to MongoDB
const connectDB = async () => {
    try {
      const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/e-shop');
      console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
      console.warn('⚠️  MongoDB connection failed. Running in development mode without database.');
      console.warn('To enable full functionality, please start MongoDB or update MONGO_URI in .env');
      console.warn('Error details:', (error as Error).message);
      // Don't exit in development - allow server to run without DB for frontend development
      if (process.env.NODE_ENV === 'production') {
        process.exit(1);
      }
    }
  };

export default connectDB;