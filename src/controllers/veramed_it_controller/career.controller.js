// controllers/careerController.js

import Career from '../../models/veramed_it_model/career.model.js'; // Adjust the import path to your model file

/**
 * @desc    Submit a new career application
 * @route   POST /api/careers/apply
 * @access  Public
 */
export const submitApplication = async (req, res) => {
  try {
    // 1. Destructure all expected form fields from the request body
    const { fullName, email, contact, position, coverLetter } = req.body;

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Resume file is required. Please upload a valid file type (PDF, DOC, DOCX, PNG, JPG)."
      });
    }

    const resumeUrl = req.file.path;

    // 4. Create a new document instance using your Career model.
    //    Mongoose will automatically validate this data against your schema's rules.
    const newApplication = new Career({
      fullName,
      email,
      contact, // This now matches your schema and frontend form
      position,
      coverLetter,
      resume: resumeUrl, // Storing the URL as a string, matching your updated schema
    });

    // 5. Save the document to the database. If validation fails, this will throw an error.
    await newApplication.save();

    // 6. If saving is successful, send a 201 Created response.
    res.status(201).json({
      success: true,
      message: "Application submitted successfully! We will be in touch.",
    });

  } catch (error) {
    // --- Comprehensive Error Handling ---

    // A) Handle Mongoose Validation Errors (e.g., required fields missing, invalid email format)
    if (error.name === 'ValidationError') {
      // Collect all validation error messages into a single string.
      const messages = Object.values(error.errors).map(val => val.message).join(' ');
      return res.status(400).json({ success: false, message: messages });
    }

    // B) Handle Duplicate Key Errors (e.g., the unique email constraint is violated)
    if (error.code === 11000) {
      return res.status(409).json({ // 409 Conflict is more specific for duplicates
        success: false,
        message: 'An application with this email address already exists.'
      });
    }

    // C) Handle any other unexpected server-side errors
    console.error('SERVER ERROR - SUBMIT APPLICATION:', error);
    res.status(500).json({
      success: false,
      message: 'A server error occurred. Please try again later.'
    });
  }
};