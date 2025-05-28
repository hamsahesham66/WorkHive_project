import multer from "multer";

// Configure storage for uploaded files
const storage = multer.memoryStorage(); // Store files in memory as Buffer objects

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // Limit file size to 5MB
  },
});

export default upload;