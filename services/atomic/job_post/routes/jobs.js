const express = require('express');
const router = express.Router();
const jobController = require('../controllers/jobController');

router.post('/', jobController.createJob);
router.get('/:eventID', jobController.getJob);
router.get('/', jobController.listJobs);

module.exports = router;