import mongoose, { Schema, Document } from 'mongoose';

export interface IUserProperties {
  email: string;
  password: string;
}

export interface IUser extends IUserProperties, Document { }

const UserSchema = new Schema<IUser>({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
}, { timestamps: true });

const User = mongoose.model<IUser>('User', UserSchema);
export default User;