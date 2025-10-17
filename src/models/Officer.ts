import mongoose, { Schema, Document } from 'mongoose';

export interface IOfficer extends Document {
  name: string;
  role: string;
  avatar: string;
  biography: string;
  background: string;
  achievements: string[];
  joinedYear: string;
  email: string;
  quote: string;
  isActive: boolean;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const OfficerSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  role: {
    type: String,
    required: true,
    trim: true
  },
  avatar: {
    type: String,
    required: true
  },
  biography: {
    type: String,
    required: true
  },
  background: {
    type: String,
    required: true
  },
  achievements: [{
    type: String,
    required: true
  }],
  joinedYear: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true
  },
  quote: {
    type: String,
    required: true
  },
  isActive: {
    type: Boolean,
    default: true
  },
  order: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

OfficerSchema.index({ order: 1 });
OfficerSchema.index({ isActive: 1 });

export default mongoose.models.Officer || mongoose.model<IOfficer>('Officer', OfficerSchema);