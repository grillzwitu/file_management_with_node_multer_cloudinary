const Notification = require('../../models/notification');

const createNotification = async (userId, message) => {
    try {
      // Validate input data (userId and message)
      if (!userId || !message) {
        throw new Error('Missing required fields: {userId} and {message}');
      }
  
      const notification = new Notification({
        user: sanitizeUserId(userId), // Sanitize userId before creating notification
        message: message
      });
  
      await notification.save();
    } catch (err) {
      // Handle specific errors (optional in this case)
      console.error('Error occurred while creating notification:', err);
  
      // Generic error handling with sanitized message
      const sanitizedMessage = getSanitizedErrorMessage(err);
      throw new Error(sanitizedMessage); // Re-throw with sanitized error for upper-level handling
    }
};
  
function sanitizeUserId(userId) {
    // Implement logic to sanitize userId (e.g., replace with a generic identifier)
    return `user-${userId.slice(0, 4)}...`;
}
  
function getSanitizedErrorMessage(err) {
    const sanitizedMessage = err.message.replace(/\{.*?\}/g, "{...}");
    // additional sanitization logic can be added here based on potential error types
    // (e.g., removing field names or database details)
    return sanitizedMessage;
}

module.exports = createNotification;
