import express from 'express';
import { upload } from '../../middleware/uploadMiddleware.js';
import {
  collaboration,
  getAllCollabrationData,
} from '../../controllers/veramed_controller/collabrate.controller.js';

const router = express.Router();

// Route to handle contact form with file attachment
router.post('/collaborate', upload.single('attachment'), collaboration);

router.get('/collaborate', getAllCollabrationData);

export default router;
