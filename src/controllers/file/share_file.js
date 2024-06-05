const File = require('../../models/files');
const User = require('../../models/users');
const createNotification = require("../notification/create_notification");

// Share file with a user
const shareFile = async (req, res) => {
    try {
      const { fileId, username, permissions } = req.body;
  
      // Validate input data
      if (!fileId || !username || !permissions) {
        return res.status(400).json({ error: 'Missing required fields: fileId, username, permissions' });
      }
  
      // Find the user to share the file with
      const user = await User.findOne({ username });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Find the file to be shared
      const file = await File.findById(fileId);
      if (!file) {
        return res.status(404).json({ message: 'File not found' });
      }
  
      // Check if the user is already in the shared_with list
      if (file.shared_with.some(sharedUser => sharedUser.user.equals(user._id))) {
        return res.status(400).json({ message: 'File already shared with this user' });
      }
  
      // Add the user to the shared_with list with permissions
      file.shared_with.push({ user: user._id, permissions });
      await file.save();
  
      // Add the file to the user's shared_files list
      user.shared_files.push(file._id);
      await user.save();

      // Create notification for owner
      const ownerNotification = await createNotification(req.file.owner, `File "${req.file.name}" shared with user ${req.body.sharedWithUsername}.`);

      // Create notification for shared user (regardless of permission)
      const sharedUserNotification = await createNotification(req.body.sharedWithUsername, `You have been shared a file "${req.file.name}" by ${req.file.owner}.`);
  
      res.status(200).json({ message: 'File shared successfully' });
    } catch (err) {
      // Handle specific errors
      if (err.name === 'CastError') { // Mongoose cast error (e.g., invalid fileId format)
        return res.status(400).json({ error: 'Invalid data provided. Please check file ID and permissions format.' });
      }
  
      // Handle generic errors with a sanitized message
      console.error('Error occurred while sharing file:', err);
      const sanitizedMessage = err.message.replace(/\{.*?\}/g, "{...}");
      res.status(500).json({ error: 'Internal server error: File sharing failed.', details: sanitizedMessage });
    }
  };
  
  module.exports = shareFile;
