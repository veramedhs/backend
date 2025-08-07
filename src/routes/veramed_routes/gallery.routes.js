import { Router } from "express";
import { createGalleryEntry, getAllGalleryEntries } from "../../controllers/veramed_controller/gallery.controller.js";
import { upload } from "../../middleware/uploadMiddleware.js";

const router = Router();

// --- Gallery Routes ---

// GET /api/v1/gallery
// Fetches all gallery documents (each containing an array of images).
router.get("/gallery", getAllGalleryEntries);


// POST /api/v1/gallery
// Creates a new gallery document by uploading multiple images.
// - `upload.array()` is the middleware for handling multiple files.
// - "galleryImages" is the required field name for the files in the form data.
// - 12 is the maximum number of files that can be uploaded in one request.
router.post(
  "/gallery",
  upload.array("galleryImages", 12),
  createGalleryEntry
);

export default router;