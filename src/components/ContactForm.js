import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios'; 

function ContactForm() {
    const [formData, setFormData] = useState({
        name: '',
        phoneNumber: '',
        address: ''
    });
    const [error, setError] = useState('');
    const { id } = useParams(); 
    const navigate = useNavigate(); 

    useEffect(() => {
        if (id) {
            fetchContact();
        }
    }, [id]);

    const fetchContact = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`http://localhost:5250/api/contacts/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}` 
                }
            });
            setFormData({
                name: response.data.name,
                phoneNumber: response.data.phoneNumber,
                address: response.data.address
            });
        } catch (error) {
            console.error('Error fetching contact:', error);
            setError('Error fetching contact data.');
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        const token = localStorage.getItem('token'); 
        try {
            if (id) {
               
                await axios.put(`http://localhost:5250/api/contacts/${id}`, formData, {
                    headers: {
                        Authorization: `Bearer ${token}` 
                    }
                });
            } else {
                
                await axios.post('http://localhost:5250/api/contacts', formData, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
            }
            navigate('/contacts'); 
        } catch (error) {
            console.error('Error saving contact:', error);
            setError('An error occurred while saving the contact.');
        }
    };

    return (
        <div className="contact-form-container">
            <h2>{id ? 'Update' : 'Create'} Contact</h2>
            {error && <p className="error-message">{error}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Name"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="phoneNumber">Phone Number:</label>
                    <input
                        type="tel"
                        id="phoneNumber"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        placeholder="Phone Number"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="address">Address:</label>
                    <input
                        type="text"
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        placeholder="Address"
                    />
                </div>
                <button type="submit">{id ? 'Update' : 'Create'} Contact</button>
            </form>
        </div>
    );
}

export default ContactForm;
