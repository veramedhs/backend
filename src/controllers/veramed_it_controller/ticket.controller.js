// controllers/veramed_it_controller/ticket.controller.js

import Ticket from '../../models/veramed_it_model/ticket.model.js'; 

/**
 * @desc    Submit a new support ticket
 * @route   POST /api/tickets/submit
 * @access  Public
 */
export const submitTicket = async (req, res) => {
    try {
        // 1. Destructure all expected form fields from the request body.
        const { fullName, email, subject, priority, description } = req.body;

        // 2. Prepare the data object for the new ticket.
        const ticketData = {
            fullName,
            email,
            subject,
            priority,
            description,
        };

        // 3. The `uploadMiddleware` runs before this controller. If a file was uploaded,
        //    it will be available in `req.file`. We add its URL to our data.
        if (req.file) {
            ticketData.attachment = req.file.path; // `path` contains the Cloudinary URL
        }

        // 4. Create a new document. Mongoose will automatically validate the data.
        const newTicket = new Ticket(ticketData);

        // 5. Save the document to the database. This will throw an error if validation fails.
        await newTicket.save();

        // 6. Send a success response.
        res.status(201).json({
            success: true,
            message: "Support ticket submitted successfully! We will get back to you soon.",
        });

    } catch (error) {
        // --- Comprehensive Error Handling ---

        // A) Handle Mongoose Validation Errors
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(val => val.message).join(' ');
            return res.status(400).json({ success: false, message: messages });
        }

        // B) Handle any other unexpected server-side errors
        console.error('SERVER ERROR - SUBMIT TICKET:', error);
        res.status(500).json({
            success: false,
            message: 'A server error occurred. Please try again later.',
        });
    }
};