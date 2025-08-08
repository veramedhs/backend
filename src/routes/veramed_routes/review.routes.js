// src/routes/veramed/review.routes.js

import { Router } from "express";
import {
  createReview,
  getApprovedReviews,      // <-- New public controller
  getAllReviewsAdmin,      // <-- Renamed admin controller
  updateApprovalStatus,
  deleteReview,            // <-- New delete controller
} from "../../controllers/veramed_controller/review.controller.js";
import { upload } from "../../middleware/uploadMiddleware.js";
import { requireAuth } from "../../middleware/authMiddleware.js"; // <-- For protecting admin routes

const router = Router();

// --- PUBLIC ROUTES (for your website) ---

// POST /api/v1/reviews/submit
// Route for customers to submit a new review.
router.post("/review", upload.single("profileImage"), createReview);

// GET /api/v1/reviews/approved
// Route to get all *approved* reviews for public display (no pagination).
router.get("/review/approved", getApprovedReviews);


// --- ADMIN ROUTES (for your dashboard) ---

// GET /api/v1/reviews/all-admin
// Route to get *all* reviews (approved and pending) for the admin dashboard, with pagination.
router.get("/reviews/all-admin", requireAuth, getAllReviewsAdmin);

// PATCH /api/v1/reviews/toggle-approval/:id
// Route for admins to approve or unapprove a review.
router.patch("/reviews/toggle-approval/:id", requireAuth, updateApprovalStatus);

// DELETE /api/v1/reviews/:id
// Route for admins to delete a review permanently.
router.delete("/reviews/:id", requireAuth, deleteReview);

export default router;