import express from 'express';
import { submitEstimate } from '../../controllers/veramed_it_controller/estimate.controller.js'; 

const router = express.Router();

// Defines the API endpoint: POST /api/estimates/submit
// This route will be handled by the submitEstimate controller function.
router.post('/estimates/submit', submitEstimate);

export default router;