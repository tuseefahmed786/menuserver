const multer = require('multer');
const path = require('path');

// Configure storage for uploaded images
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // Set the destination to the images folder
        cb(null, path.join(__dirname, '../public/uploads/images')); // Store in the 'uploads/images' folder
    },
    filename: (req, file, cb) => {
        // Use timestamp to ensure unique filenames
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

// Initialize multer with the configured storage
const upload = multer({ storage });

// Export the upload instance
module.exports = upload;
