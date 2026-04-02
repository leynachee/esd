const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationController');

router.post('/job-created', notificationController.jobCreated);
router.post('/waitlist-joined', notificationController.waitlistJoined);
router.post('/job-accepted', notificationController.jobAccepted);

module.exports = router;