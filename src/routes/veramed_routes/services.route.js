import express from 'express';
import { deleteServiceQuery, getAllServiceQueries, submitServiceRequest } from '../../controllers/veramed_controller/service.controller.js';
import { requireAuth } from '../../middleware/authMiddleware.js';
import { upload } from '../../middleware/uploadMiddleware.js';


const router = express.Router();

// --- PUBLIC-FACING ROUTE ---
// This route is for the public form where users submit their service requests.
// It uses the .fields() middleware from multer to handle various file inputs.
router.post(
  '/services', // Using '/submit' is clearer for a creation endpoint
  upload.fields([
    { name: 'medicalReports[]', maxCount: 10 },
    { name: 'previousRecords[]', maxCount: 10 },
    { name: 'patientPassport[]', maxCount: 5 },
    { name: 'attendantPassport[]', maxCount: 5 }
  ]),
  submitServiceRequest
);


// --- ADMIN-ONLY ROUTES ---
// These routes are for your dashboard to manage the submitted queries.
// They are protected by the `requireAuth` middleware.

// 2. Add the GET route to fetch all service queries with pagination
router.get(
    '/services',
    requireAuth,
    getAllServiceQueries
);

// 3. Add the DELETE route to remove a specific service query by its ID
router.delete(
    '/services/:id',
    requireAuth,
    deleteServiceQuery
);

export default router;