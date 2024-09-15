import React, { useState } from 'react';
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import ContactForm from './components/ContactForm';
import ContactList from './components/ContactList';
import Login from './components/Login';
import Register from './components/Register';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/register" element={<Register />} />
          <Route 
            path="/contacts" 
            element={isAuthenticated ? <ContactList /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/add-contact" 
            element={isAuthenticated ? <ContactForm /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/edit-contact/:id" 
            element={isAuthenticated ? <ContactForm /> : <Navigate to="/login" />} 
          />
          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;