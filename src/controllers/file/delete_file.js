const File = require("../../models/files");
const cloudinary = require("../../utils/cloudinary");

const deleteFile = async (req, res, next) => {

    const id = req.params.id

    try {
        // fetch the record from db
        const record = await File.findById(id);
        
        // check if file exists on db
        if (!record) {
          return res.status(404).json({ error: 'File not found' });
        }
      
        // Delete image from Cloudinary
        await cloudinary.uploader.destroy(record.storage_id);
    
        // Delete file record from the database
        await File.findByIdAndDelete(req.params.id);
    
        res.status(200);
        res.json(record);
        //return res.redirect(req.get("referer"));
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal server error');
    }
}

module.exports = deleteFile;
