import mongoose, { Schema } from "mongoose";

const reviewSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    location: {
      type: String,
      required: [true, "Location is required"],
      trim: true,
    },
    review: {
      type: String,
      required: [true, "Review text is required"],
    },
    rating: {
      type: Number,
      required: [true, "Rating is required"],
      min: 1,
      max: 5,
    },
    profileImageUrl: {
      type: String, // We will store the URL from Cloudinary here
    },
    isApproved: {
      type: Boolean,
      default: false, // CRITICAL: Reviews should not be public by default
    },
  },
  { timestamps: true }
);

export const Review = mongoose.model("Review", reviewSchema);