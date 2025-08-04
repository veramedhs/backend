import Collabration from '../../models/veramed_model/collaboration.model.js';

export const collaboration = async (req, res) => {
  const { fullName, email, phone, message } = req.body;

  try {
    if (!fullName || !email || !phone) {
      return res.status(400).json({
        message: 'All fields are required',
        success: false,
      });
    }

    console.log('Uploaded file:', req.file);
    const attachment = req.file?.path || null;

    const newCollabrator = new Collabration({
      fullName,
      email,
      phone,
      message,
      attachment,
    });

    await newCollabrator.save();

    res.status(201).json({
      message: 'collaboration submitted successfully',
      success: true,
      data: newCollabrator,
    });
  } catch (error) {
    console.error('collabration submission error:', error);
    res.status(500).json({
      message: 'Server error. Please try again later.',
      success: false,
    });
  }
};

export const getAllCollabrationData = async (req, res) => {
  try {
    const data = await Collabration.find().sort({ createdAt: -1 });

    if (!data) {
      res
        .status(400)
        .json({
          success: false,
          message: 'collabration data is not availlable',
        });
    }

    res.status(200).json({ success: true, data });
  } catch (error) {
    console.error('collabration submission error:', error);
    res.status(500).json({
      message: 'Server error. Please try again later.',
      success: false,
    });
  }
};
