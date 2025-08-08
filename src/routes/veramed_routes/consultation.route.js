import express from 'express';
import {
  createConsultationRequest, // Assuming you want to keep the creation route here
  getAllConsultations,
  deleteConsultation,
} from '../../controllers/veramed_controller/consultation.controller.js'; // Adjust path as needed
import { requireAuth } from '../../middleware/authMiddleware.js'; 

const router = express.Router();

// --- PUBLIC ROUTE (for submitting the form) ---
router.post('/consultation', createConsultationRequest);

// --- ADMIN-ONLY ROUTES ---

// GET /api/v1/consultations/
router.get('/consultation', requireAuth, getAllConsultations);

// DELETE /api/v1/consultations/:id
router.delete('/consultation/:id', requireAuth, deleteConsultation);

export default router;