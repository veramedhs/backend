// controllers/consultation.controller.js
import { validationResult } from 'express-validator';
import Consultation from "../../models/veramed_model/consultation.model.js"

export const createConsultationRequest = async (req, res) => {
  // 1. Check for validation errors thrown by express-validator
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed. Please check the data you entered.',
      errors: errors.array(), // Provides a detailed list of what went wrong
    });
  }

  try {
    // 2. Extract the sanitized data from the request body
    const {
      fullName,
      email,
      phone,
      preferredCountry,
      medicalCondition,
      additionalInfo, // Ensure your frontend textarea has name="additionalInfo"
    } = req.body;

    // 3. Create a new document using the Consultation model
    const newConsultation = new Consultation({
      fullName,
      email,
      phone,
      preferredCountry,
      medicalCondition,
      additionalInfo,
    });

    // 4. Save the document to the database
    await newConsultation.save();

    // 5. Send a successful response
    res.status(201).json({
      success: true,
      message: 'Consultation request submitted successfully! We will get back to you shortly.',
      data: newConsultation,
    });
  } catch (error) {
    // 6. Handle potential server or database errors
    console.error('Error creating consultation request:', error);
    res.status(500).json({
      success: false,
      message: 'An unexpected server error occurred. Please try again later.',
    });
  }
};

// --- GET ALL CONSULTATION SUBMISSIONS (with Pagination) ---
export const getAllConsultations = async (req, res) => {
  try {
    // Set up pagination parameters from query string, with defaults
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const skip = (page - 1) * limit;

    // Fetch the total number of documents for calculating total pages
    const totalConsultations = await Consultation.countDocuments();

    // Fetch the paginated data, sorting by newest first
    const consultations = await Consultation.find({})
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    // Send the response with data and pagination info
    res.status(200).json({
      success: true,
      message: 'Consultations retrieved successfully.',
      data: consultations,
      pagination: {
        total: totalConsultations,
        page,
        totalPages: Math.ceil(totalConsultations / limit),
      },
    });
  } catch (error) {
    console.error('Error retrieving consultations:', error);
    res.status(500).json({
      success: false,
      message: 'A server error occurred while retrieving consultations.',
    });
  }
};

// --- DELETE A CONSULTATION SUBMISSION ---
export const deleteConsultation = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the document by its ID and delete it
    const deletedConsultation = await Consultation.findByIdAndDelete(id);

    // If no document was found, it means the ID was invalid
    if (!deletedConsultation) {
      return res.status(404).json({
        success: false,
        message: 'Consultation submission not found.',
      });
    }

    // Confirm successful deletion
    res.status(200).json({
      success: true,
      message: 'Consultation submission deleted successfully.',
    });
  } catch (error) {
    console.error('Error deleting consultation:', error);
    res.status(500).json({
      success: false,
      message: 'A server error occurred while deleting the consultation.',
    });
  }
};