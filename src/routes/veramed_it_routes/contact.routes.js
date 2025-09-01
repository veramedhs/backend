// routes/veramed_it/contact.route.js

import express from 'express';
import { submitContactForm } from '../../controllers/veramed_it_controller/contact.controller.js'; 

const router = express.Router();

// Defines the API endpoint: POST /api/contact/submit
// This route will be handled by the submitContactForm controller.
router.post('/contact/submit', submitContactForm);

export default router;