import express from 'express';
import { upload } from '../../middleware/uploadMiddleware.js';
import {
  collaboration,
  getAllCollabrationData,
} from '../../controllers/veramed_controller/collabrate.controller.js';

const router = express.Router();

// UPDATE: Use upload.array() to handle multiple files.
// The field name 'attachments[]' must match what you append in the FormData on the frontend.
router.post('/collaborate', upload.array('attachments[]'), collaboration);

router.get('/collaborate', getAllCollabrationData);

export default router;