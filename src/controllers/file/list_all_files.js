const File = require("../../models/files");

// All files
const readAllFiles = async (req, res, next) => {
    try {
        const files = await File.find({owner: req.user.username});

        // Sending response with files
        res.status(200).send(files);
    } catch (err) {
        // If an error occurs during database query
        console.error('Error occurred while reading files:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = readAllFiles;
