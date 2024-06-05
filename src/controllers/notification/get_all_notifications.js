const Notification = require('../models/notification');

const getAllNotifications = async (req, res, next) => {
    try {
        const notifications = await Notification.find({ user: req.user._id });
        res.status(200).json(notifications);
    } catch (err) {
        console.error('Error occurred while fetching notifications:', err);
        res.status(500).json({ error: 'Internal server error', details: err.message });
    }
} 

module.exports = getAllNotifications;
