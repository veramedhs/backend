// routes/ticket.routes.js

import express from 'express';
import { submitTicket } from '../../controllers/veramed_it_controller/ticket.controller.js';
import { upload } from '../../middleware/uploadMiddleware.js';

const router = express.Router();


router.post('/tickets/submit', upload.single('attachment'), submitTicket);

export default router;