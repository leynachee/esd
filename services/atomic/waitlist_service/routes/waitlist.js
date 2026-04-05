const express = require('express');
const router = express.Router();
const { addToWaitlist, getWaitlist } = require('../controllers/waitlistController');

router.post('/', addToWaitlist);
router.get('/:eventId', getWaitlist);

module.exports = router;