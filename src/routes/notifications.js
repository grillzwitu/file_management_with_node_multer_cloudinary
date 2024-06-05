const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../auth/auth');
const getAllNotifications = require('../controllers/notification/get_all_notifications');
const readNotification = require('../controllers/notification/read_notification');

// Get all notifications
router.get("/all", ensureAuthenticated, getAllNotifications);

// Mark notification as read
router.patch('/notifications/:id/read', ensureAuthenticated, readNotification);

module.exports = router;
