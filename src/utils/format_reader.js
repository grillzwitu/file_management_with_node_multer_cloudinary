const extractFileFormat = (filename) => {
    // Split the filename by the dot
    const parts = filename.split('.');
    
    // If the filename has at least one dot and the last part is not empty
    if (parts.length > 1 && parts[parts.length - 1] !== '') {
        // Extract and return the last part as the file format
        return parts[parts.length - 1];
    } else {
        // if the filename doesn't contain a valid file format
        return "unknown";
    }
}

module.exports = extractFileFormat;
