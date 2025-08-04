import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema(
  {
    serviceTitle: {
      type: String,
      required: [true, 'Service title is required.'],
      trim: true,
    },
    patientName: {
      type: String,
      required: [true, 'Patient name is required.'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required.'],
      trim: true,
      lowercase: true,
      match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
    },
    countryCode: {
      type: String,
      required: [true, 'Country code is required.'],
      trim: true,
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required.'],
      trim: true,
    },
    medicalCondition: {
      type: String,
      trim: true,
    },
    hospitalName: {
      type: String,
      trim: true,
    },
    // File URLs will be stored here
    medicalReports: {
      type: String,
      trim: true,
    },
    previousRecords: {
      type: String,
      trim: true,
    },
    attendantName: {
      type: String,
      trim: true,
    },
    relation: {
      type: String,
      trim: true,
    },
    passportNumber: {
      type: String,
      trim: true,
    },
    travelDates: {
      type: String,
      trim: true,
    },
    dateOfBirth: {
      type: Date,
    },
    travelers: {
      type: Number,
      min: 1,
    },
    attendantPassport: {
      type: String,
      trim: true,
    },
    patientPassport: {
      type: String,
      trim: true,
    },
    message: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      enum: ['Pending', 'Contacted', 'In Progress', 'Resolved', 'Closed'],
      default: 'Pending',
    },
  },
  {
    // Adds createdAt and updatedAt timestamps
    timestamps: true,
  }
);

const Service = mongoose.model('Service', serviceSchema);

export default Service;