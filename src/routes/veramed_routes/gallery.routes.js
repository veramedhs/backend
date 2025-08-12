import { Router } from "express";
import { createGalleryEntry, deleteGalleryImages, getAllGalleryEntries } from "../../controllers/veramed_controller/gallery.controller.js";
import { upload } from "../../middleware/uploadMiddleware.js";
import { requireAuth } from "../../middleware/authMiddleware.js";

const router = Router();

// --- Gallery Routes ---

// GET /api/v1/gallery
router.get("/gallery", getAllGalleryEntries);


router.post(
  "/gallery",
  upload.array("galleryImages", 12),
  createGalleryEntry
);

router.delete(
    "/images",
    requireAuth, 
    deleteGalleryImages
);

export default router;