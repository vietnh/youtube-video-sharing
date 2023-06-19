import mongoose, { Schema, Document, Date } from 'mongoose';

export interface IVideoProperties {
  videoId: string;
  title: string;
  description: string;
  shared_by: string;
  shared_at: Date;
}

export interface IVideo extends IVideoProperties, Document {}

const VideoSchema = new Schema<IVideo>({
  videoId: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  shared_by: {
    type: String,
    required: true,
  },
  shared_at: {
    type: Date,
    required: true,
  },
});

const Video = mongoose.model<IVideo>('Video', VideoSchema);
export default Video;
