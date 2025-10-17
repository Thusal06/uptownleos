import mongoose, { Schema, Document } from 'mongoose';

export interface INews extends Document {
  title: string;
  content: string;
  summary: string;
  author: string;
  image?: string;
  category: string;
  tags: string[];
  isPublished: boolean;
  featured: boolean;
  publishedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const NewsSchema: Schema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  content: {
    type: String,
    required: true
  },
  summary: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true,
    trim: true
  },
  image: {
    type: String
  },
  category: {
    type: String,
    required: true,
    trim: true
  },
  tags: [{
    type: String,
    trim: true
  }],
  isPublished: {
    type: Boolean,
    default: false
  },
  featured: {
    type: Boolean,
    default: false
  },
  publishedAt: {
    type: Date
  }
}, {
  timestamps: true
});

NewsSchema.index({ publishedAt: -1 });
NewsSchema.index({ isPublished: 1 });
NewsSchema.index({ featured: 1 });
NewsSchema.index({ category: 1 });

export default mongoose.models.News || mongoose.model<INews>('News', NewsSchema);