// routes/consultation.route.js
import express from 'express';
import { consultationValidationRules } from '../../validator/consultation.validation.js';
import { createConsultationRequest } from '../../controllers/veramed_controller/consultation.controller.js';

const router = express.Router();

// @route   POST api/consultation
// @desc    Submit a new free consultation request
// @access  Public
router.post(
  '/consultation',
  consultationValidationRules(), // The validation rules are applied here
  createConsultationRequest
);

export default router;