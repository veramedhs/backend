// models/estimate.model.js

import mongoose from 'mongoose';
import validator from 'validator';

const estimateSchema = new mongoose.Schema(
    {
        // --- Step 3: Contact Information ---
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
        phone: {
            type: String,
            required: [true, 'Your phone number is required.'],
            trim: true
        },
        company: { type: String, trim: true },
        role: { type: String, trim: true },

        // --- Step 1: Project Details ---
        projectType: {
            type: String,
            required: [true, 'Please select a project type.'],
            enum: ['mobile-app', 'web-app', 'website', 'ecommerce', 'backend', 'design-only']
        },
        complexity: {
            type: String,
            required: [true, 'Please select a complexity level.'],
            enum: ['simple', 'moderate', 'complex', 'enterprise'],
            default: 'moderate'
        },
        timeline: {
            type: String,
            required: [true, 'Please select a timeline.'],
            enum: ['rush', 'standard', 'relaxed', 'flexible'],
            default: 'standard'
        },
        budget: { type: String, trim: true },
        description: {
            type: String,
            required: [true, 'Please provide a project description.'],
            trim: true,
            maxLength: [5000, 'Description cannot exceed 5000 characters.']
        },

        // --- Step 2: Features & Scope ---
        platforms: {
            type: [String], // Array of strings
            default: []
        },
        features: {
            type: [String], // Array of strings
            default: []
        },
        hasDesigns: { type: Boolean, default: false },
        hasContent: { type: Boolean, default: false },
        needsHosting: { type: Boolean, default: false },
        needsMaintenance: { type: Boolean, default: false },
        
        // --- Internal Tracking ---
        status: {
            type: String,
            enum: ['New', 'Reviewed', 'Quoted', 'Archived'],
            default: 'New'
        }
    },
    { timestamps: true } // Adds createdAt and updatedAt fields
);

const Estimate = mongoose.model('Estimate', estimateSchema);

export default Estimate;