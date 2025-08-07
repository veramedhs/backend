// src/controllers/review.controller.js

import { Review } from "../../models/veramed_model/review.model.js"; 

// --- CONTROLLER 1: CREATE A NEW REVIEW (Customer Facing) ---
export const createReview = async (req, res) => {
  try {
    const { name, location, rating, review } = req.body;

    if ([name, location, rating, review].some((field) => !field || String(field).trim() === "")) {
      return res.status(400).json({ 
        success: false, 
        message: "Name, location, rating, and review are all required fields." 
      });
    }

    const profileImageUrl = req.file?.path || "";
    
    const newReview = await Review.create({
      name,
      location,
      rating: Number(rating),
      review,
      profileImageUrl: profileImageUrl,
      // isApproved will default to false based on the schema
    });

    return res.status(201).json({
      success: true,
      message: "Review submitted successfully and is awaiting approval.",
      data: newReview
    });

  } catch (error) {
    console.error("Error creating review:", error);
    return res.status(500).json({ 
      success: false, 
      message: "An internal server error occurred while creating the review." 
    });
  }
};


// --- CONTROLLER 2: GET ALL REVIEWS (Admin Only) ---
// Fetches all reviews, regardless of their approval status, for an admin dashboard.
export const getAllReviews = async (req, res) => {
  try {
    // Fetch all reviews and sort by newest first
    const reviews = await Review.find({}).sort({ createdAt: -1 });

    if (!reviews) {
      // This case is unlikely but good practice to handle
      return res.status(404).json({ success: false, message: "Could not fetch reviews." });
    }

    return res.status(200).json({
      success: true,
      message: "All reviews fetched successfully.",
      count: reviews.length,
      data: reviews,
    });

  } catch (error) {
    console.error("Error fetching all reviews:", error);
    return res.status(500).json({ 
      success: false, 
      message: "An internal server error occurred." 
    });
  }
};


export const updateApprovalStatus = async (req, res) => {
  try {
    const { id } = req.params; // The ID of the review to update

    // Find the review by its ID first
    const review = await Review.findById(id);

    if (!review) {
      return res.status(404).json({ success: false, message: "No review found with this ID." });
    }

    // Toggle the isApproved status
    const updatedReview = await Review.findByIdAndUpdate(
      id,
      { isApproved: !review.isApproved },
      { new: true, runValidators: true }
    );

    return res.status(200).json({
      success: true,
      message: `Review status has been toggled to '${updatedReview.isApproved ? "Approved" : "Not Approved"}'.`,
      data: updatedReview,
    });

  } catch (error) {
    console.error("Error toggling review status:", error);
    // Handle invalid ID format error
    if (error.name === 'CastError') {
      return res.status(400).json({ success: false, message: "Invalid review ID format." });
    }
    return res.status(500).json({ 
      success: false, 
      message: "An internal server error occurred." 
    });
  }
};
