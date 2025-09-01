// controllers/consultation.controller.js

import ConsultationIt from '../../models/veramed_it_model/consultation.model.js'; 

/**
 * @desc    Submit a new consultation request
 * @route   POST /api/consultations/submit
 * @access  Public
 */
export const submitConsultation = async (req, res) => {
    try {
        // 1. Destructure all expected fields from the request body
        const { fullName, companyName, email, service, projectDetails } = req.body;

        // 2. Create a new document using the Consultation model.
        //    Mongoose will automatically validate the data against the schema rules.
        const newRequest = new ConsultationIt({
            fullName,
            companyName,
            email,
            service,
            projectDetails,
        });

        // 3. Save the document to the database. This will throw an error if validation fails.
        await newRequest.save();

        // 4. Send a success response back to the client.
        res.status(201).json({
            success: true,
            message: "Request received! We'll get back to you shortly.",
        });

    } catch (error) {
        // --- Comprehensive Error Handling ---

        // A) Handle Mongoose Validation Errors
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(val => val.message).join(' ');
            return res.status(400).json({ success: false, message: messages });
        }

        // B) Handle any other unexpected server-side errors
        console.error('SERVER ERROR - SUBMIT CONSULTATION:', error);
        res.status(500).json({
            success: false,
            message: 'A server error occurred. Please try again later.',
        });
    }
};