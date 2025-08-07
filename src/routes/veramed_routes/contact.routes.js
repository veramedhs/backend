// routes/veramed/contact.route.js
import express from 'express';
import { upload } from '../../middleware/uploadMiddleware.js';
import {
  contact,
  getAllContactUsData,
} from '../../controllers/veramed_controller/contact.controller.js';

const router = express.Router();

// Route to handle contact form with multiple file attachments
router.post(
  '/contact',
  upload.array('attachments[]'), 
  contact
);

router.get('/contact', getAllContactUsData);

export default router;