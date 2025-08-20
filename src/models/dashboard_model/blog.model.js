import mongoose from "mongoose";
import slugify from "slugify";

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    slug: {
      type: String,
      required: true,
      unique: true
    },
    image: {
      type: String, // Cloudinary URL
      required: true
    },
    content: {
      type: String,
      required: true
    },
    language: {
      type: String,
      required: true

    },
    website: {
      type: String,
      enum: ["veramed", "arahm"],
      required: true
    }
  },
  { timestamps: true }
);

// Automatically generate slug from title before saving
blogSchema.pre("validate", function (next) {
  if (this.title && !this.slug) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }
  next();
});

export const Blog = mongoose.model("Blog", blogSchema);
