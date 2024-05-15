const deleteFile = require("../../utils/delete_local_file");
const File = require("../../models/files");
const cloudinary = require("../../utils/cloudinary");

const uploadFile = async (req, res, next) => {
    try {

        // Upload image to cloudinary
        const uploadedFile = await cloudinary.uploader.upload(req.file.path, { resource_type: "auto" });
        
        // Create file record 
        let file = new File({
            name: uploadedFile.original_filename,
            owner: req.user.username,
            storage_id: uploadedFile.public_id,
            url: uploadedFile.secure_url,
            last_update_date: uploadedFile.created_at
        });
        
        // Save file
        await file.save();

        // Remove file from local storage (uploads)
        deleteFile(req.file.path);

        // Sending response
        res.status(201)
        return res.redirect("/files?currentPage=files");
    } catch (err) {
        //logger.error('Error occurred while uploading file:', err);
        res.status(400).json({ success: false, error: 'File upload failed. Please try again.' });
    }
};

module.exports = uploadFile;
