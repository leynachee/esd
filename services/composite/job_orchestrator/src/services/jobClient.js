const axios = require('axios');

const createJobInDatabase = async (jobDetails) => {
    const url = process.env.JOB_SVC_URL || 'http://job-service:5002';
    const response = await axios.post(`${url}/api/jobs`, jobDetails);
    return response.data;
};

module.exports = { createJobInDatabase };