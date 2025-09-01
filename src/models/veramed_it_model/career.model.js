// models/careerModel.js

import mongoose from 'mongoose';
import validator from 'validator';

const careerSchema = new mongoose.Schema(
    {
        fullName: {
            type: String,
            required: [true, 'Full name is a required field.'],
            trim: true,
            minLength: [3, 'Full name must be at least 3 characters long.'],
            maxLength: [100, 'Full name cannot exceed 100 characters.'],
        },
        email: {
            type: String,
            required: [true, 'Email address is a required field.'],
            unique: true, // Ensures every application has a unique email
            trim: true,
            lowercase: true, // Converts email to lowercase before saving
            validate: [validator.isEmail, 'Please provide a valid email address.'],
        },
        // Renamed to 'contact' to match frontend form, but 'phoneNumber' is also fine
        contact: {
            type: String,
            required: [true, 'Contact number is a required field.'],
            trim: true,
            validate: {
                validator: function (v) {
                    // Simple regex for basic phone number patterns
                    return /^\+?[0-9\s\(\)-]{10,15}$/.test(v);
                },
                message: props => `${props.value} is not a valid phone number format.`,
            },
        },
        position: {
            type: String,
            enum: {
                values: [
                    'backend-dev',
                    'frontend-dev',
                    'fullstack-dev',
                    'devops',
                    'ui-ux',
                ],
                message: '{VALUE} is not a supported position.',
            },
            required: [true, 'Selecting a position is required.'],
        },
        // --- UPDATED RESUME FIELD ---
        // Storing the resume URL directly as a string.
        resume: {
            type: String,
            required: [true, 'Resume URL from Cloudinary is missing.'],
            validate: [validator.isURL, 'Please provide a valid URL for the resume.']
        },
        coverLetter: {
            type: String,
            trim: true,
            maxLength: [1000, 'Cover letter cannot exceed 2000 characters.'],
        },
    },
    { timestamps: true }
);

const Career = mongoose.model('Career', careerSchema);

export default Career;