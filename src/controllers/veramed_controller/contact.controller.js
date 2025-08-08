// controllers/veramed_controller/contact.controller.js
import { ENV } from '../../config/ENV.js';
import Contact from '../../models/veramed_model/contact.model.js';

export const contact = async (req, res) => {
  const { fullName, email, phone, message } = req.body;

  try {
    if (!fullName || !email || !phone) {
      return res.status(400).json({
        message: 'All required fields (Full Name, Email, Phone) must be filled out.',
        success: false,
      });
    }

    // req.files will be an array of files from multer
    console.log('Uploaded files:', req.files); 

    // Map over the req.files array to get the path of each file.
    // If no files are uploaded, req.files will be an empty array.
    const attachments = req.files ? req.files.map(file => file.path) : [];

    const newContact = new Contact({
      fullName,
      email,
      phone,
      message,
      attachment: attachments, 
    });

    await newContact.save();

    res.status(201).json({
      message: 'Contact form submitted successfully!',
      success: true,
      data: newContact,
    });
  } catch (error) {
    console.error('Error during contact form submission:', error);
    res.status(500).json({
      message: 'A server error occurred. Please try again later.',
      success: false,
    });
  }
};

// controllers/veramed_controller/contact.controller.js

export const getAllContactUsData = async (req, res) => {
  try {
    // Get page and limit from query params, with default values
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10; // Default to 10 items per page
    const skip = (page - 1) * limit;

    // Fetch a paginated list of contacts
    const contacts = await Contact.find()
      .sort({ createdAt: -1 }) // Sort by newest first
      .skip(skip)
      .limit(limit);

    // Get the total number of documents in the collection
    const totalContacts = await Contact.countDocuments();

    res.status(200).json({
      message: 'Successfully retrieved contact data.',
      success: true,
      data: contacts,
      pagination: {
        total: totalContacts,
        page: page,
        totalPages: Math.ceil(totalContacts / limit),
      },
    });
  } catch (error) {
    console.error('Error retrieving contact data:', error);
    res.status(500).json({
      message: 'A server error occurred. Please try again later.',
      success: false,
    });
  }
};

// ... (keep the existing contact and getAllContactUsData functions)

// --- DELETE CONTACT SUBMISSION ---
export const deleteContactSubmission = async (req, res) => {
  const { id } = req.params;

  try {
    // Find the contact submission by its ID and delete it
    const deletedContact = await Contact.findByIdAndDelete(id);

    // If no document was found with that ID, send a 404 response
    if (!deletedContact) {
      return res.status(404).json({
        success: false,
        message: 'Contact submission not found.',
      });
    }

    // Send a success response
    res.status(200).json({
      success: true,
      message: 'Contact submission deleted successfully.',
    });
  } catch (error) {
    console.error('Error deleting contact submission:', error);
    res.status(500).json({
      message: 'A server error occurred. Please try again later.',
      success: false,
    });
  }
};