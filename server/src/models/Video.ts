import mongoose, { Schema, Document } from 'mongoose';

export interface IVideoProperties {
  videoId: string;
  title: string;
  description: string;
  sharedBy: string;
  createdAt: Date;
}

export interface IVideo extends IVideoProperties, Document {}

const VideoSchema = new Schema<IVideo>({
  videoId: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  sharedBy: {
    type: String,
    required: true,
  },
}, { timestamps: true });

const Video = mongoose.model<IVideo>('Video', VideoSchema);
export default Video;
