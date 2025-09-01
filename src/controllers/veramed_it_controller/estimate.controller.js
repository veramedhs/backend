// controllers/veramed_it_controller/estimate.controller.js

import Estimate from '../../models/veramed_it_model/estimate.model.js';

/**
 * @desc    Submit a new project estimate request
 * @route   POST /api/estimates/submit
 * @access  Public
 */
export const submitEstimate = async (req, res) => {
    try {
        const newEstimate = new Estimate(req.body);

        // 2. Save the document to the database. If validation fails, this will throw an error.
        await newEstimate.save();

        // 3. Send a success response back to the client.
        res.status(201).json({
            success: true,
            message: "Quote request received! We will get back to you within 24 hours.",
        });

    } catch (error) {
        // --- Comprehensive Error Handling ---

        // A) Handle Mongoose Validation Errors (e.g., required fields missing, enum mismatch)
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(val => val.message).join(' ');
            return res.status(400).json({ success: false, message: messages });
        }

        // B) Handle any other unexpected server-side errors
        console.error('SERVER ERROR - SUBMIT ESTIMATE:', error);
        res.status(500).json({
            success: false,
            message: 'A server error occurred. Please try again later.',
        });
    }
};
