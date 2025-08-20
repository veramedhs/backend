import express from "express";
import { createBlog, getAllBlogs, getBlogBySlug } from "../../controllers/dashboard/blog.controller.js";
import { upload } from "../../middleware/uploadMiddleware.js";

const router = express.Router();

// Image comes in field name "image"
router.post("/blog", upload.single("image"), createBlog);


router.get("/blog/all/:website", getAllBlogs);

// Get single blog by slug
router.get("/blog/:slug", getBlogBySlug);


export default router;