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
  fromCountry: {
    type: String,
    required: true
  },
  toCountry: {
    type: String,
    required: true
  },
  serviceNeeded: {
    type: String,
    trim: true,
    maxlength: 100
  },
  message: {
    type: String,
    required: true,
    trim: true,
    minlength: 10
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('ContactMessage', contactMessageSchema);
