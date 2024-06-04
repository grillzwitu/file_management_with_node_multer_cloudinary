const File = require("../../models/files");

// All files
const readAllFiles = async (req, res, next) => {
  try {
    // Building the query to include both owned and shared files
    const query = {
      $or: [
        { owner: req.user.username },
        { shared_with: req.user._id }
      ]
    };

    // Finding the files
    const files = await File.find(query).populate('shared_with', 'username');

    // Sending response with files
    res.status(200).json(files); // Assuming JSON response
    // Render the files page with the files data
    //res.render("pages/files", { currentPage: 'files', files: files });
  } catch (err) {
    // Handle generic errors with a sanitized message
    console.error('Error occurred while reading files:', err);
    const sanitizedMessage = err.message.replace(/\{.*?\}/g, "{...}");
    res.status(500).json({ error: 'Internal server error: Failed to retrieve files.', details: sanitizedMessage });
  }
};

module.exports = readAllFiles;
