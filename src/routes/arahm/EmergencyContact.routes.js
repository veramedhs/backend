// routes/basicContactRoutes.js
import express from 'express';
import { addEmergencyContact, getEmergencyContact } from '../../controllers/arahm/emergencyContact.controller.js';

const router = express.Router();

router.post('/emergency-contact', addEmergencyContact); // Add contact
router.get('/emergency-contact', getEmergencyContact); // Get all contacts

export default router;