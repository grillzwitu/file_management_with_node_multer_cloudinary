const File = require("../../models/files");

// List of files by name files
const readFilesByName = async (req, res, name, next) => {
    try {
        // Replace spaces in the name parameter with \s* to handle spaces
        const modifiedName = name.replace(/\s/g, "\\s*");

        // Building the query
        const query = {
            $or: [
                { owner: req.user.username, name: { $regex: `.*${modifiedName}.*`, $options: 'i' } },
                { shared_with: req.user._id, name: { $regex: `.*${modifiedName}.*`, $options: 'i' } }
            ]
        };

        // Finding the files
        const files = await File.find(query).populate('shared_with', 'username');

        // If no files are found
        if (files.length === 0) {
            return res.status(404).json({ message: 'No files found matching the given name.' });
        }

        // Sending response with files
        res.status(200).send(files);
    } catch (err) {
        // If an error occurs during the database query
        console.error('Database error occurred while reading files:', err);
        res.status(500).json({ error: 'Internal server error: Database query failed.', details: err.message });
    }
};

module.exports = readFilesByName;
