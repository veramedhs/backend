import Collabration from '../../models/veramed_model/collaboration.model.js';

export const collaboration = async (req, res) => {
  const { fullName, email, phone, message } = req.body;

  try {
    if (!fullName || !email || !phone) {
      return res.status(400).json({
        message: 'All required fields (Full Name, Email, Phone) must be provided.',
        success: false,
      });
    }

    // UPDATE: Files are now in req.files (an array) instead of req.file
    console.log('Uploaded files:', req.files);

    // Map over the req.files array to get the path of each uploaded file.
    // If no files were uploaded, this will default to an empty array.
    const attachments = req.files ? req.files.map(file => file.path) : [];

    const newCollabrator = new Collabration({
      fullName,
      email,
      phone,
      message,
      attachment: attachments, // Save the array of file paths
    });

    await newCollabrator.save();

    res.status(201).json({
      message: 'Collaboration request submitted successfully!',
      success: true,
      data: newCollabrator,
    });
  } catch (error) {
    console.error('Collaboration submission error:', error);
    res.status(500).json({
      message: 'A server error occurred. Please try again later.',
      success: false,
    });
  }
};

export const getAllCollabrationData = async (req, res) => {
  try {
    const data = await Collabration.find().sort({ createdAt: -1 });

    if (!data || data.length === 0) {
      // Changed the condition to check for empty array as well
      return res.status(404).json({ // Use 404 for "Not Found"
        success: false,
        message: 'Collaboration data is not available.',
      });
    }

    res.status(200).json({ success: true, data });
  } catch (error) {
    console.error('Error retrieving collaboration data:', error);
    res.status(500).json({
      message: 'A server error occurred. Please try again later.',
      success: false,
    });
  }
};