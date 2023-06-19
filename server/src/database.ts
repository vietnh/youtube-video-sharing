import mongoose from 'mongoose';

export async function connect(uri: string): Promise<void> {
  try {
    await mongoose.connect(uri, {
      autoCreate: true
    });
    console.log('MongoDB connected');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
}