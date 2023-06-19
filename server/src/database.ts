import mongoose from 'mongoose';
import { createDefaultUsers } from './scripts/defaultUsers';

export async function connect(uri: string): Promise<void> {
  try {
    await mongoose.connect(uri, {
      autoCreate: true
    });
    console.log('MongoDB connected');

    await createDefaultUsers();
    console.log('Default data successfully created');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
}