// controllers/contact.controller.js

import itContact from '../../models/veramed_it_model/contact.model.js';

/**
 * @desc    Submit a new contact form inquiry
 * @route   POST /api/contact/submit
 * @access  Public
 */
export const submitContactForm = async (req, res) => {
    try {
        // 1. Create a new document using the Contact model.
        //    Mongoose will automatically validate req.body against the schema.
        const newInquiry = new itContact(req.body);

        // 2. Save the document. If any validation fails, it will throw an error.
        await newInquiry.save();

        // 3. Send a success response.
        res.status(201).json({
            success: true,
            message: "Message sent! Thank you for reaching out. We will get back to you shortly.",
        });

    } catch (error) {
        // --- Error Handling ---

        // A) Handle Mongoose Validation Errors
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(val => val.message).join(' ');
            return res.status(400).json({ success: false, message: messages });
        }

        // B) Handle any other unexpected server-side errors
        console.error('SERVER ERROR - SUBMIT CONTACT FORM:', error);
        res.status(500).json({
            success: false,
            message: 'A server error occurred. Please try again later.',
        });
    }
};