// routes/consultation.routes.js

import express from 'express';
import { submitConsultation } from '../../controllers/veramed_it_controller/consultation.controller.js';

const router = express.Router();

// Define the POST route for submitting the form
// When a request hits this URL, it will execute the submitConsultation controller
router.post('/consultation/submit', submitConsultation);

export default router;