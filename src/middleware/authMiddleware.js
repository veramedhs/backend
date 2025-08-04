import jwt from 'jsonwebtoken';
import { ENV } from '../config/ENV.js';

const JWT_SECRET = ENV.JWT_SECRET;

// Verify token
export const requireAuth = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith('Bearer ')) {
        return res
            .status(401)
            .json({ success: false, message: 'No token provided' });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, ENV.JWT_SECRET);
        req.user = decoded; // Attach userId and role to req
        next();
    } catch (err) {
        return res
            .status(401)
            .json({ success: false, message: 'Invalid or expired token' });
    }
};

// Role check
export const requireRole = (roles) => (req, res, next) => {
    if (!roles.includes(req.user.role)) {
        return res.status(403).json({ success: false, message: 'Access denied' });
    }
    next();
};
