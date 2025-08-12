// routes/embassyContactRoutes.js
import express from 'express';
import { sendEmbassyContact, getAllEmbassyContacts } from '../../controllers/arahm/embassyContact.controller.js';
import { requireAuth } from '../../middleware/authMiddleware.js';

const router = express.Router();

router.post('/embassy-contact', sendEmbassyContact); // Public route
router.get('/embassy-contact',requireAuth, getAllEmbassyContacts); // Admin route

export default router;
