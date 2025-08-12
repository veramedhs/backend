// models/BasicContact.js
import mongoose from 'mongoose';

const emergencyConatcSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 2
  },
  phoneNumber: {
    type: String,
    required: true,
    match: [/^[0-9]{7,15}$/, 'Please enter a valid phone number']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('BasicContact', emergencyConatcSchema);
