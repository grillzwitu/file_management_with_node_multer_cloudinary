const Notification = require("../../models/notification");

const readNotification = async (req, res, next) => {
  try {
    // Validate input data (ID)
    if (!req.params.id) {
      return res.status(400).json({ error: 'Missing required field: notification ID' });
    }

    // Fetch the notification with findByIdAndUpdate
    const notification = await Notification.findByIdAndUpdate(
      req.params.id,
      { read: true },
      { new: true } // Return the updated document
    );

    // Check if the notification was found and updated
    if (!notification) {
      return res.status(404).json({ error: 'Notification not found' });
    }

    // Send the updated notification (excluding potentially sensitive data)
    const sanitizedNotification = { ...notification };
    delete sanitizedNotification.owner; // Example: exclude owner information

    res.status(200).json(sanitizedNotification);
  } catch (err) {
    // Handle specific errors
    if (err.name === 'CastError') { // Mongoose cast error (e.g., invalid notification ID format)
      return res.status(400).json({ error: 'Invalid notification ID provided.' });
    }

    // Handle generic errors with a sanitized message
    console.error('Error occurred while updating notification:', err);
    const sanitizedMessage = err.message.replace(/\{.*?\}/g, "{...}");
    res.status(500).json({ error: 'Internal server error: Failed to update notification.', details: sanitizedMessage });
  }
};

module.exports = readNotification;
