const File = require('../../models/files');
const User = require('../../models/users');

// Update file permissions for a shared user
const updatePermission = async (req, res) => {
  try {
    const { fileId, username, permissions } = req.body;

    // Validate input data
    if (!fileId || !username || !permissions) {
      return res.status(400).json({ error: 'Missing required fields: fileId, username, permissions' });
    }

    // Find the user to update permissions for
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Find the file to be updated
    const file = await File.findById(fileId);
    if (!file) {
      return res.status(404).json({ message: 'File not found' });
    }

    // Check if the requesting user is the owner of the file
    if (file.owner !== req.user.username) {
      return res.status(403).json({ message: 'Only the file owner can update permissions' });
    }

    // Find the shared user in the shared_with array
    const sharedUserIndex = file.shared_with.findIndex(sharedUser => sharedUser.user.equals(user._id));
    if (sharedUserIndex === -1) {
      return res.status(404).json({ message: 'User does not have shared access to this file' });
    }

    // Update the permissions
    file.shared_with[sharedUserIndex].permissions = { ...file.shared_with[sharedUserIndex].permissions, ...permissions };
    await file.save();

    res.status(200).json({ message: 'Permissions updated successfully' });
  } catch (err) {
    // Handle specific errors
    if (err.name === 'CastError') { // Mongoose cast error (e.g., invalid fileId format)
      return res.status(400).json({ error: 'Invalid data provided. Please check file ID and permissions format.' });
    }

    // Handle generic errors with a sanitized message
    console.error('Error occurred while updating permissions:', err);
    const sanitizedMessage = err.message.replace(/\{.*?\}/g, "{...}");
    res.status(500).json({ error: 'Internal server error: Failed to update permissions.', details: sanitizedMessage });
  }
};

module.exports = updatePermission;
