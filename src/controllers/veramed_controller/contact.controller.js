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
      // Save the array of file paths
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

export const getAllContactUsData = async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.status(200).json({
      message: 'Successfully retrieved all contact data.',
      success: true,
      data: contacts,
    });
  } catch (error) {
    console.error('Error retrieving contact data:', error);
    res.status(500).json({
      message: 'A server error occurred. Please try again later.',
      success: false,
    });
  }
};