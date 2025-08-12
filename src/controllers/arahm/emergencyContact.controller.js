// controllers/basicContactController.js
import EmergencyContact from '../../models/arahm/emergencyContact.model.js';

// Create new basic contact
export const addEmergencyContact = async (req, res) => {
    try {
        const { name, phoneNumber } = req.body;

        // Manual validation (extra safety beyond Mongoose)
        if (!name || name.trim().length < 2) {
            return res.status(400).json({
                success: false,
                message: 'Name must be at least 2 characters long.'
            });
        }

        const newContact = new EmergencyContact({
            name: name.trim(),
            phoneNumber
        });

        await newContact.save();

        res.status(201).json({
            success: true,
            message: 'Contact added successfully.',
            newContact
        });

    } catch (error) {
        console.error('Error adding contact:', error);
        res.status(500).json({
            success: false,
            message: 'Server error. Please try again later.'
        });
    }
};

// Get all basic contacts
export const getEmergencyContact = async (req, res) => {
    try {
        const contacts = await EmergencyContact.find().sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            data: contacts
        });
    } catch (error) {
        console.error('Error fetching contacts:', error);
        res.status(500).json({
            success: false,
            message: 'Server error. Please try again later.'
        });
    }
};
