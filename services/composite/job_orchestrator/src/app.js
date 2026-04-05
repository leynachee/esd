require('dotenv').config();
const express = require('express');
const cors = require('cors');

const { verifyOrCreateClient } = require('./services/userClient');
const { createJobInDatabase } = require('./services/jobClient');

const app = express();
app.use(express.json());
app.use(cors());

//Scenario 1: Client Posts a Job
app.post('/api/orchestrator/jobs', async (req, res) => {
    const { 
        UserID, 
        EventType, 
        EventWage, 
        EventRequirements, 
        EventTimeline 
    } = req.body;

    if (!UserID || !EventType || !EventWage) {
        return res.status(400).json({ message: "UserID, EventType, and EventWage are required." });
    }

    try {
        const clientData = await verifyOrCreateClient(UserID);

        const jobPayload = {
            ClientID: UserID,
            EventType: EventType,
            EventWage: EventWage,
            EventRequirements: EventRequirements || null,
            EventTimeline: EventTimeline || null,
            Status: 'Open'
        };

        const newJob = await createJobInDatabase(jobPayload);

        res.status(201).json({
            message: "Job successfully posted to the marketplace.",
            job: newJob
        });

    } catch (error) {
        console.error("Scenario 1 Orchestration Error:", error.message);
        
        const failedAt = error.config ? error.config.url : "Unknown step";
        
        res.status(502).json({ 
            message: "Scenario 1 flow failed", 
            failed_at: failedAt,
            details: error.response ? error.response.data : error.message
        });
    }
});

app.get('/health', (req, res) => res.json({ status: 'Job Orchestrator is running' }));

const PORT = process.env.PORT || 5010;
app.listen(PORT, () => {
    console.log(`Scenario 1 Orchestrator running on port ${PORT}`);
});