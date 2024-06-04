const File = require("../../models/files");
const cloudinary = require("../../utils/cloudinary");

const deleteFile = async (req, res, next) => {
  const id = req.params.id;

  try {
    // Validate input data (ID)
    if (!id) {
      return res.status(400).json({ error: 'Missing required field: file ID' });
    }

    // Attempt to delete the file with both ID and owner check
    const record = await File.findOneAndDelete({ _id: id, owner: req.user.username });

    // Check if the file was found and deleted
    if (!record) {
      return res.status(404).json({ error: 'File not found or you do not have permission to delete this file' });
    }

    // Delete the file from Cloudinary
    await cloudinary.uploader.destroy(record.storage_id);

    // Send the deleted file information (excluding potentially sensitive data) as the response
    const sanitizedRecord = { ...record };
    delete sanitizedRecord.owner; // Example: exclude owner information
    delete sanitizedRecord.shared_with; // Example: exclude shared_with list

    res.status(200).json(sanitizedRecord);
  } catch (err) {
    // Handle specific errors (consider adding more as needed)
    if (err.name === 'CastError') { // Mongoose cast error (e.g., invalid file ID format)
      return res.status(400).json({ error: 'Invalid file ID provided.' });
    }

    // Handle generic errors with a sanitized message
    console.error('Error occurred while deleting the file:', err);
    const sanitizedMessage = err.message.replace(/\{.*?\}/g, "{...}");
    res.status(500).json({ error: 'Internal server error: Failed to delete file.', details: sanitizedMessage });
  }
};

module.exports = deleteFile;
