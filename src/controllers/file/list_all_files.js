const File = require("../../models/files");

// All files
const readAllFiles = async (req, res, next) => {
    const files = await File.find();

    // check for files
    if (!files) {
        return res.status(404).json({ error: 'No files found' });
    }

    res.status(200).json(files);
}

module.exports = readAllFiles;
