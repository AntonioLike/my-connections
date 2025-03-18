import axios from 'axios';

const API_URL = 'http://localhost:3000/link'; // Adjust according to your backend URL

// Get user token (needed for linking)
export const getUserToken = async () => {
    try {
        const token = localStorage.getItem('token'); // Retrieve auth token
        const response = await axios.get(`${API_URL}/user/token`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data.userToken;
    } catch (error) {
        console.error('Error fetching user token:', error.response ? error.response.data : error.message);
        throw error.response ? error.response.data : error.message;
    }
};

// Request a link with another user
export const requestLink = async (userToken, targetToken) => {
    try {
        const token = localStorage.getItem('token'); // Retrieve auth token
        const response = await axios.post(
            `${API_URL}/request`,
            { userToken, targetToken },
            { headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" } }
        );
        return response.data; // Response contains message about link status
    } catch (error) {
        console.error('Error requesting link:', error.response ? error.response.data : error.message);
        throw error.response ? error.response.data : error.message;
    }
};

// Get all confirmed links for the logged-in user
export const getConfirmedLinks = async () => {
    try {
        const token = localStorage.getItem('token'); // Retrieve auth token
        const response = await axios.get(`${API_URL}/request`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data.links; // Response contains an array of confirmed links
    } catch (error) {
        console.error('Error fetching confirmed links:', error.response ? error.response.data : error.message);
        throw error.response ? error.response.data : error.message;
    }
};

// Delete a link between two users
export const deleteLink = async (userToken, targetToken) => {
    try {
        const token = localStorage.getItem('token'); // Retrieve auth token
        const response = await axios.delete(`${API_URL}/${userToken}/${targetToken}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data; // Response contains message about deletion status
    } catch (error) {
        console.error('Error deleting link:', error.response ? error.response.data : error.message);
        throw error.response ? error.response.data : error.message;
    }
};
