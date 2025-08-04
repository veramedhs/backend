import express from 'express';
import { submitServiceRequest } from '../../controllers/veramed_controller/service.controller.js';
import upload from '../../config/multerConfig.js';

const router = express.Router();

router.post(
  '/services',
  upload.fields([
    { name: 'medicalReports', maxCount: 1 },
    { name: 'previousRecords', maxCount: 1 },
    { name: 'patientPassport', maxCount: 1 },
    { name: 'attendantPassport', maxCount: 1 }
  ]),
  submitServiceRequest
);

export default router;
