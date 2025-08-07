import mongoose, { Schema } from "mongoose";

// The sub-document schema for a single image remains the same.
const imageSchema = new Schema({
  imageUrl: {
    type: String,
    required: true,
  },
  publicId: {
    type: String,
    required: true,
  },
});

const gallerySchema = new Schema(
  {
    images: [imageSchema],
  },
  { timestamps: true }
);

export const Gallery = mongoose.model("Gallery", gallerySchema);