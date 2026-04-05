const express = require('express');
const app = express();

app.use(express.json());

const notificationRoutes = require('./routes/notifications');
app.use('/notifications', notificationRoutes);

module.exports = app;