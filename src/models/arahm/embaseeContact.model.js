// models/EmbassyContact.js
import mongoose from 'mongoose';

const embassyContactSchema = new mongoose.Schema({
  embassyOrConsulate: {
    type: String,
    required: true,
    trim: true
  },
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 2
  },
  officialEmail: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address']
  },
  contactNumber: {
    type: String,
    required: true,
    match: [/^[0-9]{7,15}$/, 'Please enter a valid contact number']
  },
  countryCode: {
    type: String,
    required: true,
    trim: true
  },
  message: {
    type: String,
    required: true,
    trim: true,
    minlength: 5
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('EmbassyContact', embassyContactSchema);
