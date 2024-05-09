const mongoose = require('mongoose');

/* Creating the schema with name, email, password and date */
const FileSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    public_id: {
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
  
  /* Exporting schema with collection as CrudOperations */
  const User = mongoose.model('File', FileSchema);
  
  module.exports = File;
