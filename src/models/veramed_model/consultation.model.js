// models/consultation.model.js
import mongoose from 'mongoose';

const consultationSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, 'Full Name is required.'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email address is required.'],
      trim: true,
      lowercase: true,
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required.'],
      trim: true,
    },
    preferredCountry: {
      type: String,
      trim: true,
    },
    medicalCondition: {
      type: String,
      required: [true, 'Medical condition is required.'],
      trim: true,
    },
    additionalInfo: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      enum: ['Pending', 'Contacted', 'Closed'],
      default: 'Pending',
    },
  },
  {
    // Automatically adds createdAt and updatedAt fields
    timestamps: true,
  }
);

const Consultation = mongoose.model('Consultation', consultationSchema);

export default Consultation;