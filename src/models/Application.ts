import mongoose, { Schema, Document } from 'mongoose';

export interface IApplication extends Document {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: Date;
  occupation: string;
  education: string;
  interests: string[];
  motivation: string;
  skills: string[];
  experience: string;
  availability: string;
  referenceName?: string;
  referenceContact?: string;
  status: 'pending' | 'reviewing' | 'accepted' | 'rejected';
  notes?: string;
  reviewedBy?: string;
  reviewedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const ApplicationSchema: Schema = new Schema({
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true
  },
  phone: {
    type: String,
    required: true
  },
  dateOfBirth: {
    type: Date,
    required: true
  },
  occupation: {
    type: String,
    required: true
  },
  education: {
    type: String,
    required: true
  },
  interests: [{
    type: String,
    required: true
  }],
  motivation: {
    type: String,
    required: true
  },
  skills: [{
    type: String
  }],
  experience: {
    type: String
  },
  availability: {
    type: String,
    required: true
  },
  referenceName: {
    type: String
  },
  referenceContact: {
    type: String
  },
  status: {
    type: String,
    enum: ['pending', 'reviewing', 'accepted', 'rejected'],
    default: 'pending'
  },
  notes: {
    type: String
  },
  reviewedBy: {
    type: String
  },
  reviewedAt: {
    type: Date
  }
}, {
  timestamps: true
});

ApplicationSchema.index({ status: 1 });
ApplicationSchema.index({ createdAt: -1 });
ApplicationSchema.index({ email: 1 });

export default mongoose.models.Application || mongoose.model<IApplication>('Application', ApplicationSchema);