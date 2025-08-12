// routes/contactRoutes.js
import express from 'express';
import { sendContactMessage, getAllContactMessages } from '../../controllers/arahm/contact.controller.js';
import { requireAuth } from '../../middleware/authMiddleware.js';

const router = express.Router();

router.post('/contact', sendContactMessage); // Public route
router.get('/contact', requireAuth, getAllContactMessages); // Admin route

export default router;
