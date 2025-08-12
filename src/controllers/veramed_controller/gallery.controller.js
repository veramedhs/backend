import { deleteFromCloudinary } from "../../config/cloudinary.js";
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

export const deleteGalleryImages = async (req, res) => {
  // 1. Get the array of publicIds from the request body.
  const { publicIds } = req.body;

  // 2. Validate the input.
  if (!publicIds || !Array.isArray(publicIds) || publicIds.length === 0) {
    return res.status(400).json({
      success: false,
      message: "An array of 'publicIds' is required in the request body.",
    });
  }

  try {
    // 3. Delete the files from Cloudinary first.
    // If this fails, it will throw an error and we won't touch the database.
    await deleteFromCloudinary(publicIds);

    // 4. Pull (remove) the image sub-documents from the `images` array
    // in any gallery document where the publicId matches one in our list.
    const dbResult = await Gallery.updateMany(
      { "images.publicId": { $in: publicIds } }, // Find documents containing the images
      {
        $pull: {
          images: { publicId: { $in: publicIds } },
        },
      }
    );

    // Optional: Clean up empty gallery documents after deletion
    await Gallery.deleteMany({ images: { $size: 0 } });

    // 5. Send a success response.
    return res.status(200).json({
      success: true,
      message: `${publicIds.length} image(s) deleted successfully.`,
      dbInfo: dbResult,
    });

  } catch (error) {
    console.error("Error during gallery image deletion:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "An internal server error occurred.",
    });
  }
};