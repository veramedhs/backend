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