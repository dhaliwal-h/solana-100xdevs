const multer = require('multer');

// Set up multer to store files in memory
const storage = multer.memoryStorage();

// Configure multer to handle single file uploads
const upload = multer({ storage });

module.exports = upload;
