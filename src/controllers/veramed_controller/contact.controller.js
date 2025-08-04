import { ENV } from '../../config/ENV.js';
import Contact from '../../models/veramed_model/contact.model.js';

export const contact = async (req, res) => {
  const { fullName, email, phone, message } = req.body;

  try {
    if (!fullName || !email || !phone) {
      return res.status(400).json({
        message: 'All fields are required',
        success: false,
      });
    }

    console.log('Uploaded file:', req.file);

    const attachment = req.file?.path || null; // ✅ Use .path for CloudinaryStorage

    const newContact = new Contact({
      fullName,
      email,
      phone,
      message,
      attachment,
    });

    await newContact.save();

    res.status(201).json({
      message: 'Contact submitted successfully',
      success: true,
      data: newContact,
    });
  } catch (error) {
    console.error('Contact submission error:', error);
    res.status(500).json({
      message: 'Server error. Please try again later.',
      success: false,
    });
  }
};

export const getAllContactUsData = async (req, res) => {
  try {
    const data = await Contact.find().sort({ createdAt: -1 });

    if (!data || data.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'contact us data is not available',
      });
    }
    res.status(200).json({ success: true, data });
  } catch (error) {
    if (ENV.ENVIRONMENT !== 'production') {
      console.error('Contact fetch error:', error);
    }
    res.status(500).json({
      message: 'Server error. Please try again later.',
      success: false,
    });
  }
};
