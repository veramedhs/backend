// middleware/uploadMiddleware.js

import { v2 as cloudinary } from 'cloudinary';
import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import { ENV } from '../config/ENV.js';



// Configure Cloudinary credentials
cloudinary.config({
  cloud_name: ENV.CLOUDINARY_CLOUD_NAME,
  api_key: ENV.CLOUDINARY_API_KEY,
  api_secret: ENV.CLOUDINARY_API_SECRET,
});

// Configure Cloudinary storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'veramed-attachments',
    resource_type: 'auto',
  },
});

// Allow only specific file types
const fileFilter = (req, file, cb) => {
  // --- DEBUG STEP 2: LOG THE MIME TYPE OF EVERY UPLOAD ATTEMPT ---
  console.log(`Attempting to upload file: ${file.originalname} with MIME type: ${file.mimetype}`);

  const allowedMimeTypes = [
    'image/jpeg',
    'image/png',
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  ];

  if (allowedMimeTypes.includes(file.mimetype)) {
    console.log(`File type ${file.mimetype} is allowed. Accepting file.`);
    cb(null, true); // Accept the file
  } else {
    console.log(`File type ${file.mimetype} is NOT allowed. Rejecting file.`);
    // Reject the file, but don't throw an error that crashes the app
    cb(null, false);
  }
};

// Export the multer upload instance
export const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB max
  },
});