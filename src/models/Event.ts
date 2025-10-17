import mongoose, { Schema, Document } from 'mongoose';

export interface IEvent extends Document {
  title: string;
  description: string;
  date: Date;
  location: string;
  type: 'meeting' | 'service' | 'fundraising' | 'social' | 'training' | 'other';
  status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
  image?: string;
  registrationLink?: string;
  maxAttendees?: number;
  currentAttendees: number;
  organizer: string;
  contactEmail: string;
  highlights: string[];
  createdAt: Date;
  updatedAt: Date;
}

const EventSchema: Schema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['meeting', 'service', 'fundraising', 'social', 'training', 'other'],
    required: true
  },
  status: {
    type: String,
    enum: ['upcoming', 'ongoing', 'completed', 'cancelled'],
    default: 'upcoming'
  },
  image: {
    type: String
  },
  registrationLink: {
    type: String
  },
  maxAttendees: {
    type: Number
  },
  currentAttendees: {
    type: Number,
    default: 0
  },
  organizer: {
    type: String,
    required: true
  },
  contactEmail: {
    type: String,
    required: true,
    lowercase: true,
    trim: true
  },
  highlights: [{
    type: String
  }]
}, {
  timestamps: true
});

EventSchema.index({ date: 1 });
EventSchema.index({ status: 1 });
EventSchema.index({ type: 1 });

export default mongoose.models.Event || mongoose.model<IEvent>('Event', EventSchema);