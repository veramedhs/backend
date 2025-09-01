// models/veramed_it_model/ticket.model.js

import mongoose from 'mongoose';
import validator from 'validator';

const ticketSchema = new mongoose.Schema(
    {
        fullName: {
            type: String,
            required: [true, 'Your full name is required.'],
            trim: true,
        },
        email: {
            type: String,
            required: [true, 'Your email address is required.'],
            trim: true,
            lowercase: true,
            validate: [validator.isEmail, 'Please provide a valid email address.'],
        },
        subject: {
            type: String,
            required: [true, 'A subject for your ticket is required.'],
            trim: true,
            maxLength: [200, 'Subject cannot exceed 200 characters.'],
        },
        priority: {
            type: String,
            required: [true, 'Please select a priority level.'],
            enum: ['low', 'medium', 'high', 'urgent'],
            default: 'medium',
        },
        description: {
            type: String,
            required: [true, 'Please provide a detailed description of the issue.'],
            trim: true,
            maxLength: [5000, 'Description cannot exceed 5000 characters.'],
        },
        // This will store the URL of the file uploaded to Cloudinary
        attachment: {
            type: String,
            validate: [validator.isURL, 'Please provide a valid URL for the attachment.'],
            default: null, // Default to null if no file is uploaded
        },
        status: {
            type: String,
            enum: ['Open', 'In Progress', 'Closed'],
            default: 'Open',
        },
    },
    { timestamps: true } // Automatically adds createdAt and updatedAt
);

const Ticket = mongoose.model('Ticket', ticketSchema);

export default Ticket;