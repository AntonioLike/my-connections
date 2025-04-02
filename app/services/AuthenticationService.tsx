import axios from 'axios';

const API_URL = 'http://localhost:3000/user'; // Adjust according to your backend URL

interface AuthResponse {
    user: {
        id: string;
        name: string;
        email: string;
    };
    token: string;
}


const handleError = (error: unknown): never => {
    if (axios.isAxiosError(error) && error.response) {
        console.error('API Error:', error.response.data);
        throw error.response.data;
    }
    console.error('Unexpected Error:', error);
    throw new Error('An unexpected error occurred');
};

// Register a new user
export const register = async (name: string, email: string, password: string, confirmPassword: string) => {
    try {
        if (password !== confirmPassword) {
            throw new Error('Passwords do not match');
        }

        const response = await axios.post(`${API_URL}/`, { name, email, password },
            {
                headers: { "Content-Type": "application/json" }
            });
        return response.data; // Response contains the newly created user
    } catch (error) {
        handleError(error);
    }
};

export const login = async (email: string, password: string): Promise<AuthResponse> => {
    try {
        const response = await axios.post<AuthResponse>(`${API_URL}/login`, { email, password });
        const { token, user } = response.data;

        return { user, token };
    } catch (error) {
        handleError(error);
    }

    // Ensure a valid return value
    throw new Error("Login failed, no response received.");
};


// Reset password
export const resetPassword = async (email: string) => {
    try {
        const response = await axios.post(`${API_URL}/reset`, { email });
        return response.data; // Response contains a message confirming the password reset
    } catch (error) {
        handleError(error);
    }
};

// Get user by ID
export const getUserById = async (id: string) => {
    try {
        const response = await axios.get(`${API_URL}/${id}`);
        return response.data; // Response contains the user data
    } catch (error) {
        handleError(error);
    }
};

// Update user by ID
export const updateUser = async (id: string, updatedData: object) => {
    try {
        const response = await axios.put(`${API_URL}/${id}`, updatedData);
        return response.data; // Response contains the updated user
    } catch (error) {
        handleError(error);
    }
};

// Delete user by ID
export const deleteUser = async (id: string) => {
    try {
        const response = await axios.delete(`${API_URL}/${id}`);
        return response.data; // Response contains a message confirming the deletion
    } catch (error) {
        handleError(error);
    }
};
