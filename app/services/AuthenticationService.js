// services/authService.js
import axios from 'axios';

const API_URL = 'http://localhost:3000/user'; // Adjust according to your backend URL

// Register a new user
export const register = async (email, password, confirmPassword) => {
    try {
        if (password !== confirmPassword) {
            throw new Error('Passwords do not match');
        }

        const response = await axios.post(`${API_URL}/`, { email, password });
        return response.data; // Response contains the newly created user
    } catch (error) {
        console.error('Registration error:', error.response ? error.response.data : error.message);
        throw error.response ? error.response.data : error.message;
    }
};

// Login user (This assumes that you have a login route in your backend)
export const login = async (email, password) => {
    try {
        const response = await axios.post(`${API_URL}/login`, { email, password });
        return response.data; // Response contains user info and possibly a JWT token
    } catch (error) {
        console.error('Login error:', error.response ? error.response.data : error.message);
        throw error.response ? error.response.data : error.message;
    }
};

// Reset password (This assumes you have a reset route in your backend)
export const resetPassword = async (email) => {
    try {
        const response = await axios.post(`${API_URL}/reset`, { email });
        return response.data; // Response contains a message confirming the password reset
    } catch (error) {
        console.error('Reset password error:', error.response ? error.response.data : error.message);
        throw error.response ? error.response.data : error.message;
    }
};

// Get user by ID (optional, if needed)
export const getUserById = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/${id}`);
        return response.data; // Response contains the user data
    } catch (error) {
        console.error('Error fetching user by ID:', error.response ? error.response.data : error.message);
        throw error.response ? error.response.data : error.message;
    }
};

// Update user by ID (optional, if needed)
export const updateUser = async (id, updatedData) => {
    try {
        const response = await axios.put(`${API_URL}/${id}`, updatedData);
        return response.data; // Response contains the updated user
    } catch (error) {
        console.error('Error updating user:', error.response ? error.response.data : error.message);
        throw error.response ? error.response.data : error.message;
    }
};

// Delete user by ID (optional, if needed)
export const deleteUser = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/${id}`);
        return response.data; // Response contains a message confirming the deletion
    } catch (error) {
        console.error('Error deleting user:', error.response ? error.response.data : error.message);
        throw error.response ? error.response.data : error.message;
    }
};
