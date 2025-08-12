import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});



export const deleteFromCloudinary = async (publicIds) => {
  if (!publicIds || publicIds.length === 0) {
    return; // Nothing to delete
  }

  try {
    // `delete_resources` is the method for bulk deletion
    const result = await cloudinary.api.delete_resources(publicIds);
    console.log("Successfully deleted resources from Cloudinary:", result);
    return result;
  } catch (error) {
    console.error("Cloudinary deletion error:", error);
    // We throw the error so the calling function knows something went wrong.
    throw new Error("Failed to delete images from cloud storage.");
  }
};

export default cloudinary;
