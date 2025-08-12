// controllers/contactController.js
import ContactMessage from '../../models/arahm/contact.model.js';

// Create a new contact message
export const sendContactMessage = async (req, res) => {
    try {
        const { name, phoneNumber, from, to, serviceNeeded, message } = req.body;

        console.log(name,phoneNumber,from,to,serviceNeeded,message)

        // Manual validation (extra layer of protection beyond Mongoose schema)
        if (!name || name.trim().length < 2) {
            return res.status(400).json({ success: false, message: 'Full name must be at least 2 characters.' });
        }
        if (!from) {
            return res.status(400).json({ success: false, message: 'From country is required.' });
        }
        if (!to) {
            return res.status(400).json({ success: false, message: 'To country is required.' });
        }
        if (!message || message.trim().length < 10) {
            return res.status(400).json({ success: false, message: 'Message must be at least 10 characters.' });
        }

        // Save to database
        const newMessage = new ContactMessage({
            name,
            phoneNumber,
            from,
            to,
            serviceNeeded: serviceNeeded || '',
            message
        });

        await newMessage.save();

        res.status(201).json({
            success: true,
            message: 'Your message has been sent successfully.',
            newMessage
        });
    } catch (error) {
        console.error('Error sending contact message:', error);
        res.status(500).json({
            success: false,
            message: 'Server error. Please try again later.'
        });
    }
};

// Get all contact messages (admin only)
export const getAllContactMessages = async (req, res) => {
    try {
        const messages = await ContactMessage.find().sort({ createdAt: -1 });
        res.status(200).json({ success: true, data: messages });
    } catch (error) {
        console.error('Error fetching contact messages:', error);
        res.status(500).json({ success: false, message: 'Server error. Please try again later.' });
    }
};
