const File = require("../../models/files");

// List of files by file format
const readFilesByExtension = async (req, res, ext, next) => {
  try {
    // Validate input data (extension)
    if (!ext) {
      return res.status(400).json({ error: 'Missing required field: file extension' });
    }

    // Building the query
    const query = {
      $or: [
        { owner: req.user.username, file_format: { $regex: ext, $options: 'i' } },
        { shared_with: req.user._id, file_format: { $regex: ext, $options: 'i' } }
      ]
    };

    // Finding the files
    const files = await File.find(query).populate('shared_with', 'username');

    // If no files are found
    if (files.length === 0) {
      return res.status(404).json({ message: 'No files found matching the given file format.' });
    }

    // Sending response with files
    res.status(200).json(files);
  } catch (err) {
    // Handle generic errors with a sanitized message
    console.error('Error occurred while reading files:', err);
    const sanitizedMessage = err.message.replace(/\{.*?\}/g, "{...}");
    res.status(500).json({ error: 'Internal server error: Failed to retrieve files.', details: sanitizedMessage });
  }
};

module.exports = readFilesByExtension;
