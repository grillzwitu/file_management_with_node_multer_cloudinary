const File = require("../../models/files");
const cloudinary = require("../../utils/cloudinary");

const deleteFile = async (req, res, next) => {
    const id = req.params.id;

    try {
        // Attempt to delete the file with both the ID and owner check
        const record = await File.findOneAndDelete({ _id: id, owner: req.user.username });

        // Check if the file was found and deleted
        if (!record) {
            return res.status(404).json({ error: 'File not found or you do not have permission to delete this file' });
        }

        // Delete the file from Cloudinary
        await cloudinary.uploader.destroy(record.storage_id);

        // Send the deleted file information as the response
        res.status(200).json(record);
    } catch (err) {
        console.error('Error occurred while deleting the file:', err);
        res.status(500).json({ error: 'Internal server error', details: err.message });
    }
};

module.exports = deleteFile;
