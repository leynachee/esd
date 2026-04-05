require('dotenv').config();
const express = require('express');
const cors = require('cors');
const waitlistRoutes = require('./routes/waitlist');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/waitlist', waitlistRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'Waitlist Atomic Service is running' });
});

// Start Server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`Waitlist Atomic Service running on port ${PORT}`);
});