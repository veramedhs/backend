import express from 'express';
import { addUser, getMe, login } from '../../controllers/dashboard/auth.controller.js';
import { requireAuth, requireRole } from '../../middleware/authMiddleware.js';

const router = express.Router();

// router.post('/register', register);
router.post('/login', login);
router.get('/me', requireAuth, getMe);
router.post('/add-user', requireAuth, requireRole(['admin']), addUser);


export default router;
