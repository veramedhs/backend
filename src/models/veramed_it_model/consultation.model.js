// models/veramed_it_model/consultation.model.js

import mongoose from 'mongoose';
import validator from 'validator';

const consultationSchema = new mongoose.Schema(
    {
        fullName: {
            type: String,
            required: [true, 'Your full name is required.'],
            trim: true,
            minLength: [3, 'Full name must be at least 3 characters long.'],
        },
        companyName: {
            type: String,
            trim: true,
            default: 'Individual', // A default value if not provided
        },
        email: {
            type: String,
            required: [true, 'Your email address is required.'],
            trim: true,
            lowercase: true,
            validate: [validator.isEmail, 'Please provide a valid email address.'],
        },
        service: {
            type: String,
            required: [true, 'Please select a service of interest.'],
            enum: { // Ensures only valid options from the form are saved
                values: ['backend', 'web', 'mobile', 'other'],
                message: '{VALUE} is not a supported service.',
            },
        },
        projectDetails: {
            type: String,
            required: [true, 'Please provide some details about your project.'],
            trim: true,
            maxLength: [3000, 'Project details cannot exceed 3000 characters.'],
        },
        status: { // Optional: for tracking the request internally
            type: String,
            enum: ['New', 'Contacted', 'Closed'],
            default: 'New',
        }
    },
    { timestamps: true } // Automatically adds createdAt and updatedAt
);

const ConsultationIt = mongoose.model('ConsultationIt', consultationSchema);

export default ConsultationIt;