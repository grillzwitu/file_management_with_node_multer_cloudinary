const File = require("../../models/files");

// List of files by tag
const readFilesByTag = async (req, res, tag, next) => {
  try {
    // Building the query with minimal data exposure
    const modifiedTag = tag.replace(/\s/g, "\\s*");
    const query = {
      $or: [
        { owner: req.user.username, tags: { $regex: `.*${modifiedTag}.*`, $options: 'i' } },
        { shared_with: req.user._id, tags: { $regex: `.*${modifiedTag}.*`, $options: 'i' } }
      ]
    };

    // Project specific fields to limit data exposure (optional)
    const projection = {
      name: 1,
      url: 1, // Adjust projection fields based on your requirements
      file_format: 1,
      tags: 1, // Include tags for filtering
      // Exclude potentially sensitive fields like owner details, shared_with list, etc.
    };

    // Finding the files with optional projection
    const files = await File.find(query, projection).populate('shared_with', 'username');

    // If no files are found
    if (files.length === 0) {
      return res.status(404).json({ message: 'No files found matching the given tag.' });
    }

    // Sending response with sanitized data
    res.status(200).json(files);
  } catch (err) {
    // Handle generic errors with a sanitized message
    console.error('Database error occurred while reading files:', err);
    const sanitizedMessage = err.message.replace(/\{.*?\}/g, "{...}");
    res.status(500).json({ error: 'Internal server error: Database query failed.', details: sanitizedMessage });
  }
};

module.exports = readFilesByTag;
