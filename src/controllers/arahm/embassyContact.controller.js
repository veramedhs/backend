
import EmbassyContact from '../../models/arahm/embaseeContact.model.js';

// Create a new embassy contact message
export const sendEmbassyContact = async (req, res) => {
  try {
    const { embassyOrConsulate, name, officialEmail, contactNumber, countryCode, message } = req.body;

    // Manual validation (extra layer beyond Mongoose)
    if (!embassyOrConsulate || embassyOrConsulate.trim().length < 2) {
      return res.status(400).json({ success: false, message: 'Please select a valid embassy or consulate.' });
    }

    if (!name || name.trim().length < 2) {
      return res.status(400).json({ success: false, message: 'Name must be at least 2 characters long.' });
    }

    if (!officialEmail || !/^\S+@\S+\.\S+$/.test(officialEmail)) {
      return res.status(400).json({ success: false, message: 'Please enter a valid official email address.' });
    }

    if (!countryCode || !/^\+\d{1,4}$/.test(countryCode)) {
      return res.status(400).json({ success: false, message: 'Please provide a valid country code (e.g., +91).' });
    }

    if (!contactNumber || !/^[0-9]{7,15}$/.test(contactNumber)) {
      return res.status(400).json({ success: false, message: 'Please enter a valid contact number.' });
    }

    if (!message || message.trim().length < 5) {
      return res.status(400).json({ success: false, message: 'Message must be at least 5 characters long.' });
    }

    // Save to DB
    const newContact = new EmbassyContact({
      embassyOrConsulate,
      name,
      officialEmail,
      contactNumber,
      countryCode,
      message
    });

    await newContact.save();

    res.status(201).json({
      success: true,
      message: 'Your message has been sent successfully.',
      data: newContact
    });

  } catch (error) {
    console.error('Error sending embassy contact:', error);
    res.status(500).json({
      success: false,
      message: 'Server error. Please try again later.'
    });
  }
};

// Get all messages (Admin use)
export const getAllEmbassyContacts = async (req, res) => {
  try {
    const contacts = await EmbassyContact.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: contacts });
  } catch (error) {
    console.error('Error fetching embassy contacts:', error);
    res.status(500).json({ success: false, message: 'Server error. Please try again later.' });
  }
};
