const axios = require('axios');

const verifyOrCreateClient = async (userId) => {
    const url = process.env.USER_SVC_URL || 'http://user-service:5005';
    
    try {
        //Check if the user exists and is a valid client
        const response = await axios.get(`${url}/users/${userId}`);
        return response.data;
    } catch (error) {
        //If user/client profile doesn't exist, create it
        if (error.response && error.response.status === 404) {
            console.log(`Client profile for ${userId} not found. Initiating lazy registration.`);
            const newClient = await axios.post(`${url}/clients`, { UserID: userId });
            return newClient.data;
        }
        throw error;
    }
};

module.exports = { verifyOrCreateClient };