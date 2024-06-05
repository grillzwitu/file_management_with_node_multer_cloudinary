const deleteFile = require("../../utils/delete_local_file");
const fileFormat  = require("../../utils/format_reader");
const File = require("../../models/files");
const cloudinary = require("../../utils/cloudinary");

const uploadFile = async (req, res, next) => {
    try {
      // Upload image to cloudinary
      const uploadedFile = await cloudinary.uploader.upload(req.file.path, { resource_type: "auto", use_filename: true });
  
      // Validate uploaded file
      if (!uploadedFile) {
        return res.status(400).json({ error: 'Failed to upload file to cloud storage.' });
      }
  
      // Create file record
      let file = new File({
        name: uploadedFile.original_filename,
        owner: req.user.username,
        storage_id: uploadedFile.public_id,
        url: uploadedFile.secure_url,
        file_format: fileFormat(uploadedFile.url),
        size: uploadedFile.bytes,
        created_date: uploadedFile.created_at
      });
  
      // Save file
      await file.save();
  
      // Remove file from local storage (uploads)
      deleteFile(req.file.path);

      // Create notification for successful upload (optional)
      const uploadNotification = await createNotification(req.user.id, `File "${req.file.originalname}" uploaded successfully.`);
  
      // Sending response
      res.status(201).json({ message: 'File uploaded successfully!', file: file, notification: uploadNotification }); // Send details of uploaded file
  
    } catch (err) {
      // Handle specific errors
      if (err.code === 11000) { // Mongoose duplicate key error (e.g., filename conflict)
        return res.status(400).json({ error: 'File with the same name already exists. Please choose a unique filename.' });
      }
  
      // Handle generic errors with a sanitized message
      console.error('Error occurred while uploading file:', err);
      const sanitizedMessage = err.message.replace(/\{.*?\}/g, "{...}"); // Remove potentially sensitive details from error message
      res.status(500).json({ error: 'Internal server error: File upload failed.', details: sanitizedMessage });
    }
  };
  
  module.exports = uploadFile;
