// routes/veramed/service.route.js
import express from 'express';
import { submitServiceRequest } from '../../controllers/veramed_controller/service.controller.js';
import { upload } from '../../middleware/uploadMiddleware.js';

const router = express.Router();

// UPDATE: The route now accepts arrays of files for each field.
// The `name` must match the FormData field name exactly (including `[]`).
// `maxCount` is increased to allow multiple uploads.
router.post(
  '/services',
  upload.fields([
    { name: 'medicalReports[]', maxCount: 10 },
    { name: 'previousRecords[]', maxCount: 10 },
    { name: 'patientPassport[]', maxCount: 5 },
    { name: 'attendantPassport[]', maxCount: 5 }
  ]),
  submitServiceRequest
);

export default router;