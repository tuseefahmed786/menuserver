const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

// Configure Cloudinary with your credentials
cloudinary.config({
CLOUDINARY_URL: process.env.CLOUDINARY_URL
});

// Configure Cloudinary storage for multer
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'uploads', // Folder name in Cloudinary where images will be stored
        allowed_formats: ['jpg', 'png'], // Allowed image formats
    },
});

// Initialize multer with the Cloudinary storage
const upload = multer({ storage });
// Export upload middleware and delete function
module.exports =  upload;


















// const multer = require('multer');
// const path = require('path');

// // Configure storage for uploaded images
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         // Set the destination to the images folder
//         cb(null, path.join(__dirname, '../public/uploads/images')); // Store in the 'uploads/images' folder
//     },
//     filename: (req, file, cb) => {
//         // Use timestamp to ensure unique filenames
//         cb(null, `${Date.now()}-${file.originalname}`);
//     }
// });

// // Initialize multer with the configured storage
// const upload = multer({ storage });

// // Export the upload instance
// module.exports = upload;
