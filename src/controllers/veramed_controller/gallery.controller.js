import { Gallery } from "../../models/veramed_model/gallery.model.js";


/**
 * @description Controller to create a new gallery entry with multiple images.
 */
export const createGalleryEntry = async (req, res) => {
  try {
    // 1. Validate that files were uploaded.
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        message: "At least one image file must be uploaded.",
      });
    }

    // 2. Map over the `req.files` array to get the image data.
    const imagesForDb = req.files.map(file => ({
      imageUrl: file.path,
      publicId: file.filename, // This is the public_id from Cloudinary
    }));

    // 3. Create the new gallery document with only the images.
    const newGalleryEntry = await Gallery.create({
      images: imagesForDb,
    });

    // 4. Send a success response.
    return res.status(201).json({
      success: true,
      message: "Gallery images uploaded successfully.",
      newGalleryEntry,
    });

  } catch (error) {
    console.error("Error creating gallery entry:", error);
    return res.status(500).json({ 
      success: false, 
      message: "An internal server error occurred." 
    });
  }
};


/**
 * @description Controller to get all gallery entries.
 * (This function remains the same as its logic is independent of the fields)
 */
export const getAllGalleryEntries = async (req, res) => {
    try {
        const galleries = await Gallery.find({}).sort({ createdAt: -1 });
        return res.status(200).json({
            success: true,
            count: galleries.length,
            data: galleries
        });
    } catch (error) {
        console.error("Error fetching gallery entries:", error);
        return res.status(500).json({ 
          success: false, 
          message: "An internal server error occurred." 
        });
    }
}