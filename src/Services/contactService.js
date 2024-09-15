import axios from 'axios';

const API_URL = 'http://localhost:5250/api';

const authHeader = () => {
    const token = localStorage.getItem('token');
    return token ? { Authorization: `Bearer ${token}` } : {};
};

export const getContacts = async () => {
    const response = await axios.get(`${API_URL}/contacts`, { headers: authHeader() });
    return response.data;
};

export const getContactById = async (id) => {
    const response = await axios.get(`${API_URL}/contacts/${id}`, { headers: authHeader() });
    return response.data;
};

export const createContact = async (contactData) => {
    try {
        const response = await axios.post(`${API_URL}/contacts`, contactData, { headers: authHeader() });
        return response.data;
    } catch (error) {
        console.error('Error creating contact:', error);
        throw error;
    }
};

export const updateContact = async (id, contactData) => {
    try {
        const response = await axios.put(`${API_URL}/contacts/${id}`, contactData, { headers: authHeader() });
        return response.data;
    } catch (error) {
        console.error('Error updating contact:', error);
        throw error;
    }
};

export const deleteContact = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/contacts/${id}`, { headers: authHeader() });
        return response.data;
    } catch (error) {
        console.error('Error deleting contact:', error);
        throw error;
    }
};
