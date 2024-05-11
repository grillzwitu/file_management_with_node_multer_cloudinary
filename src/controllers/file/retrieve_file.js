const fs = require('fs');
const File = require("../../models/files");
const axios = require('axios');
const path = require('path');
const { promisify } = require('util');
const streamPipeline = promisify(require('stream').pipeline);

const download = async (req, res, next) => {
    try {
        // Fetch the record from the database
        const result = await File.findOne({ _id: req.params.id });
    
        // check if file exists on db
        if (!result) {
          return res.status(404).json({ error: 'File not found' });
        }
    
        const url = result.url;
    
        // setting the download directory
        const downloadDir = './downloads';
    
        // Extracting filename from URL
        const filename = path.basename(url);
    
        // Create a writable stream to save the file
        const writer = fs.createWriteStream(path.join(downloadDir, filename));
    
        // Download the file from the URL and pipe it to the writer stream
        const response = await axios.get(url, { responseType: 'stream' });
        await streamPipeline(response.data, writer);
    
        console.log('File downloaded successfully.');
    
        res.status(200).json(result);
    } catch (err) {
        console.error(err);
        res.status(400).send(err);
    }
}

module.exports = download;
