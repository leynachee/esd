const express = require('express');
const app = express();

app.use(express.json());

const jobRoutes = require('./routes/jobs');
app.use('/jobs', jobRoutes);

module.exports = app;