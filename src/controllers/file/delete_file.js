const File = require("../../models/files");
const cloudinary = require("../utils/cloudinary");

exports.delete = async (req, res, next) => {

    try {
        // fetch the record from db
        const result = await File.findOne({_id: req.params.id});
        
        // check if file exists on db
        if (!result) {
          return res.status(404).json({ error: 'File not found' });
        }
      
        // Delete image from Cloudinary
        await cloudinary.uploader.destroy(result.storage_id);
    
        // Delete file record from the database
        await File.findByIdAndDelete({_id: req.params.id});
    
        res.status(200).json(result);
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal server error');
    }
}
