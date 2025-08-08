// routes/veramed/contact.route.js
import express from 'express';
import { upload } from '../../middleware/uploadMiddleware.js';
import {
  contact,
  deleteContactSubmission,
  getAllContactUsData,
} from '../../controllers/veramed_controller/contact.controller.js';
import { requireRole } from '../../middleware/authMiddleware.js';

const router = express.Router();

// Route to handle contact form with multiple file attachments
router.post(
  '/contact',
  upload.array('attachments[]'), 
  contact
);

router.get('/contact-us', getAllContactUsData);

// DELETE /api/v1/contact/submissions/:id
// 2. Add the new DELETE route
router.delete(
    '/contact-us/:id',
    deleteContactSubmission
);

export default router;