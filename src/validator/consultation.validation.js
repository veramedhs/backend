// middleware/validation/consultation.validation.js
import { body } from 'express-validator';

export const consultationValidationRules = () => {
  return [
    // Full Name: must not be empty and should have at least 2 characters.
    body('fullName')
      .trim()
      .notEmpty().withMessage('Full Name is required.')
      .isLength({ min: 2 }).withMessage('Full Name must be at least 2 characters long.'),

    // Email Address: must be a valid email format.
    body('email')
      .trim()
      .notEmpty().withMessage('Email Address is required.')
      .isEmail().withMessage('Please provide a valid email address.'),

    // Phone Number: must not be empty and should have a reasonable length.
    body('phone')
      .trim()
      .notEmpty().withMessage('Phone Number is required.')
      .isLength({ min: 10 }).withMessage('Please provide a valid phone number including the country code.'),

    // Medical Condition: must not be empty and have a minimum length for detail.
    body('medicalCondition')
      .trim()
      .notEmpty().withMessage('Medical Condition / Treatment Required is a required field.')
      .isLength({ min: 10 }).withMessage('Please provide a more detailed description of the medical condition (at least 10 characters).'),

    // Preferred Country and Additional Information are optional, so we just sanitize them.
    body('preferredCountry').trim(),
    body('additionalInfo').trim(),
  ];
};