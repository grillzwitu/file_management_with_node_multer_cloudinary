const File = require('../../models/files');
const User = require('../../models/users');

// Share file with a user
const shareFile = async (req, res) => {
    try {
        const { fileId, username, permissions } = req.body;

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

        res.status(200).json({ message: 'File shared successfully' });
    } catch (err) {
        console.error('Error occurred while sharing file:', err);
        res.status(500).json({ error: 'Internal server error', details: err.message });
    }
};

module.exports = shareFile;
