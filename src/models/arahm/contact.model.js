// models/ContactMessage.js
import mongoose from 'mongoose';

const contactMessageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 2
  },
  phoneNumber: {
    type: String,
    required: true
  },
  from: {
    type: String,
    required: true
  },
  to: {
    type: String,
    required: true
  },
  serviceNeeded: {
    type: String,
    trim: true
  },
  message: {
    type: String,
    required: true,
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('ContactMessage', contactMessageSchema);
