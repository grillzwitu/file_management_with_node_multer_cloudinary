const mongoose = require('mongoose');

/* Creating the schema with name, storage_id, url, owner and date */
const FileSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    storage_id: {
      type: String,
      required: true
    },
    url: {
      type: String,
      required: true
    },
    last_update_date: {
      type: Date,
      default: Date.now
    }
  });
  
  /* Exporting schema with collection as File */
  const File = mongoose.model('File', FileSchema);
  
  module.exports = File;
