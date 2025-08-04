import express from 'express';
import { upload } from '../../middleware/uploadMiddleware.js';
import {
  addHospital,
  getAllHospitalData,
} from '../../controllers/medical_assistant_controllers/hospital.controller.js';

const router = express.Router();

// Route to handle contact form with file attachment
router.post('/add-hospital', upload.single('image'), addHospital);

router.get('/hospitals', getAllHospitalData);

export default router;
