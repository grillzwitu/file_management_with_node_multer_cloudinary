const mongoose = require('mongoose');

// Creating the schema with name, storage_id, url, owner and date
const FileSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    owner: {
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
    file_format: {
      type: String,
      required: true
    },
    size: {
      type: Number,
      required: true
    },
    created_date: {
      type: Date,
      default: Date.now
    },
    tags: {
      type: Array,
      required: false
    },
    shared_with: [{
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      },
      permissions: {
        canShare: {
          type: Boolean,
          default: false
        },

        canDownload: {
          type: Boolean,
          default: false
        }
      }
    }]
});

// Exporting schema with collection as File
const File = mongoose.model('File', FileSchema);

module.exports = File;
