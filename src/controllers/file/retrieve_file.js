const File = require("../../models/files");
const axios = require('axios');
const path = require('path');

const download = async (req, res, next) => {
  try {
    // Validate input data (ID)
    if (!req.params.id) {
      return res.status(400).json({ error: 'Missing required field: file ID' });
    }

    // Fetch the record from the database
    const result = await File.findById(req.params.id)
      .populate('shared_with.user', 'username');

    // Check if the file exists in the database
    if (!result) {
      return res.status(404).json({ error: 'File not found' });
    }

    // Check if the user is the owner or has download permissions
    const isOwner = result.owner === req.user.username;
    const hasDownloadPermission = result.shared_with.some(sharedUser =>
      sharedUser.user.username === req.user.username && sharedUser.permissions.canDownload
    );

    if (!isOwner && !hasDownloadPermission) {
      return res.status(403).json({ error: 'You do not have permission to download this file' });
    }

    const url = result.url;

    // Extracting filename from URL
    const filename = path.basename(url);

    // Set the Content-Disposition header to force download
    res.setHeader('Content-Disposition', 'attachment; filename=' + filename);

    // Download the file from the URL and pipe it directly to the response stream
    const response = await axios.get(url, { responseType: 'stream' });
    response.data.pipe(res);

    console.log('File downloaded successfully.');
  } catch (err) {
    // Handle specific errors (consider adding more as needed)
    if (err.name === 'CastError') { // Mongoose cast error (e.g., invalid file ID format)
      return res.status(400).json({ error: 'Invalid file ID provided.' });
    } else if (err.response && err.response.status === 404) { // Handle potential 404 from external URL download
      return res.status(404).json({ error: 'File not found at the download URL.' });
    }

    // Handle generic errors with a sanitized message
    console.error('Error occurred while downloading file:', err);
    const sanitizedMessage = err.message.replace(/\{.*?\}/g, "{...}");
    res.status(500).json({ error: 'Internal server error: Failed to download file.', details: sanitizedMessage });
  }
};

module.exports = download;
