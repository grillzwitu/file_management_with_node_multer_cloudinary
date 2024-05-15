const File = require("../../models/files");
const axios = require('axios');
const path = require('path');

const download = async (req, res, next) => {
    try {
        // Fetch the record from the database
        const result = await File.findOne({ _id: req.params.id, owner:req.user.username });
    
        // check if file exists on db
        if (!result) {
            return res.status(404).json({ error: 'File not found' });
        }
    
        const url = result.url;
    
        // Extracting filename from URL
        const filename = path.basename(url);
    
        // Set the Content-Disposition header to force download
        res.setHeader('Content-Disposition', 'attachment; filename=' + filename);

        // Download the file from the URL and pipe it directly to the response stream
        const response = await axios.get(url, { responseType: 'stream' });
        response.data.pipe(res);
    
        console.log('File downloaded successfully.');
    } catch (err) {
        console.error(err);
        res.status(400).send(err);
    }
};

module.exports = download;
