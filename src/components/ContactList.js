import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function ContactList() {
    const [contacts, setContacts] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchContacts();
    }, []);

    const fetchContacts = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('http://localhost:5250/api/contacts', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setContacts(response.data);
        } catch (error) {
            console.error('Error fetching contacts:', error);
            setError('Error fetching contacts.');
        }
    };

    const handleDelete = async (id) => {
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`http://localhost:5250/api/contacts/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            fetchContacts();
        } catch (error) {
            console.error('Error deleting contact:', error);
            setError('Error deleting contact.');
        }
    };

    return (
        <div className="contact-list-container">
            <h1>Contacts</h1>
            {error && <p className="error-message">{error}</p>}
            <Link to="/add-contact">Add New Contact</Link>
            <ul>
                {contacts.map((contact) => (
                    <li key={contact.id}>
                        {contact.name} - {contact.phoneNumber}
                        <Link to={`/edit-contact/${contact.id}`}>Edit</Link>
                        <button onClick={() => handleDelete(contact.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ContactList;
