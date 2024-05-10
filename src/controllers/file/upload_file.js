const deleteFile = require("../../utils/delete_local_file")
const File = require("../models/files");
const cloudinary = require("../utils/cloudinary");

exports.uploadFile = async (req, res) => {
    try {
        // Upload image to cloudinary
        const result = await cloudinary.uploader.upload(req.file.path);
        
        // Create file record 
        let file = new File({
            name: result.original_filename,
            storage_id: result.public_id,
            url: result.secure_url,
            last_update_date: result.created_at
        });
        
        // Save file
        await file.save();

        // Remove file from uploads
        deleteFile(req.file.path);

        res.status(201).json(file);
    } catch (err) {
        console.log(err);
        res.status(400).send(err);
    }
};

