// src/routes/review.routes.js

import { Router } from "express";
import {
  createReview,
  getAllReviews,
  updateApprovalStatus,
} from "../../controllers/veramed_controller/review.controller.js";
import { upload } from "../../middleware/uploadMiddleware.js";

const router = Router();

// --- Customer Route ---
router.post("/review", upload.single("profileImage"), createReview);


// --- Admin Routes ---
router.get("/review/all", getAllReviews);
router.patch("/review/status/:id", updateApprovalStatus);


export default router;