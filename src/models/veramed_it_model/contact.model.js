// models/contact.model.js

import mongoose from 'mongoose';
import validator from 'validator';

const itContactSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Your name is required.'],
            trim: true,
            minLength: [3, 'Name must be at least 3 characters.']
        },
        email: {
            type: String,
            required: [true, 'Your email is required.'],
            trim: true,
            lowercase: true,
            validate: [validator.isEmail, 'Please provide a valid email address.']
        },
        company: {
            type: String,
            trim: true
        },
        phone: {
            type: String,
            trim: true
        },
        service: {
            type: String,
            required: [true, 'Please select a service.'],
            enum: ['mobile-app', 'web-development', 'ui-ux-design', 'ecommerce', 'backend', 'maintenance']
        },
        budget: {
            type: String,
            enum: ['under-20k', '20k-35k', '35k-50k', '50k-200k', '200k-500k', 'over-500k', '']
        },
        timeline: {
            type: String,
            enum: ['asap', '1-3-months', '3-6-months', '6plus-months', 'flexible', '']
        },
        message: {
            type: String,
            required: [true, 'A message is required.'],
            trim: true,
            maxLength: [5000, 'Message cannot exceed 5000 characters.']
        },
        status: {
            type: String,
            enum: ['New', 'Contacted', 'In Progress', 'Closed'],
            default: 'New'
        }
    },
    { timestamps: true } // Automatically adds createdAt and updatedAt
);

const itContact = mongoose.model('ItContact', itContactSchema);

export default itContact;