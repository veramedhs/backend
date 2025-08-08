// src/controllers/veramed_controller/review.controller.js

import { Review } from "../../models/veramed_model/review.model.js";

// --- CONTROLLER 1: CREATE A NEW REVIEW (Customer Facing) ---
export const createReview = async (req, res) => {
  // ... (Your existing createReview code remains unchanged)
  try {
    const { name, location, rating, review } = req.body;
    if ([name, location, rating, review].some((field) => !field || String(field).trim() === "")) {
      return res.status(400).json({ success: false, message: "All required fields must be provided." });
    }
    const newReview = await Review.create({
      name,
      location,
      rating: Number(rating),
      review,
      profileImageUrl: req.file?.path || "",
    });
    return res.status(201).json({ success: true, message: "Review submitted successfully.", data: newReview });
  } catch (error) {
    console.error("Error creating review:", error);
    return res.status(500).json({ success: false, message: "Server error during review creation." });
  }
};

// --- CONTROLLER 2: GET APPROVED REVIEWS (Public Facing, No Pagination) ---
// This controller is for your public website to display only approved reviews.
export const getApprovedReviews = async (req, res) => {
    try {
        const reviews = await Review.find({ isApproved: true }).sort({ createdAt: -1 });
        return res.status(200).json({
            success: true,
            message: "Approved reviews fetched successfully.",
            count: reviews.length,
            data: reviews,
        });
    } catch (error) {
        console.error("Error fetching approved reviews:", error);
        return res.status(500).json({ success: false, message: "An internal server error occurred." });
    }
};

// --- CONTROLLER 3: GET ALL REVIEWS (Admin Dashboard, With Pagination) ---
// This is for the admin page we built, fetching ALL reviews with pagination.
export const getAllReviewsAdmin = async (req, res) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 9;
    const skip = (page - 1) * limit;

    const totalReviews = await Review.countDocuments();
    const reviews = await Review.find({}).sort({ createdAt: -1 }).skip(skip).limit(limit);

    return res.status(200).json({
      success: true,
      message: "All admin reviews fetched successfully.",
      data: reviews,
      pagination: {
        total: totalReviews,
        page,
        totalPages: Math.ceil(totalReviews / limit),
      },
    });
  } catch (error)    {
    console.error("Error fetching all admin reviews:", error);
    return res.status(500).json({ success: false, message: "An internal server error occurred." });
  }
};

// --- CONTROLLER 4: UPDATE APPROVAL STATUS (Admin Only) ---
export const updateApprovalStatus = async (req, res) => {
  // ... (Your existing updateApprovalStatus code remains unchanged)
  try {
    const review = await Review.findById(req.params.id);
    if (!review) return res.status(404).json({ success: false, message: "Review not found." });
    const updatedReview = await Review.findByIdAndUpdate(req.params.id, { isApproved: !review.isApproved }, { new: true });
    return res.status(200).json({ success: true, message: "Approval status updated.", data: updatedReview });
  } catch (error) {
    console.error("Error updating approval status:", error);
    return res.status(500).json({ success: false, message: "Server error during status update." });
  }
};

// --- CONTROLLER 5: DELETE REVIEW (Admin Only) ---
export const deleteReview = async (req, res) => {
    try {
        const reviewToDelete = await Review.findByIdAndDelete(req.params.id);
        if (!reviewToDelete) {
            return res.status(404).json({ success: false, message: "Review not found." });
        }
        return res.status(200).json({ success: true, message: "Review deleted successfully." });
    } catch (error) {
        console.error("Error deleting review:", error);
        return res.status(500).json({ success: false, message: "An internal server error occurred." });
    }
};