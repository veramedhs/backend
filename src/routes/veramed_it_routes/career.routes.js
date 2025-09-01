import express from 'express';
import { submitApplication } from '../../controllers/veramed_it_controller/career.controller.js';
import { upload } from '../../middleware/uploadMiddleware.js';

const router = express.Router();

router.post(
  '/career/apply',
  upload.single('resume'),
  submitApplication
);

export default router;