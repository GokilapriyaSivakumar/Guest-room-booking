import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css'; // Import the CSS file

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [success, setSuccess] = useState(false); // State variable for success message
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5001/api/users/login', { email, password });
      console.log('Login successful', response.data);
      setSuccess(true); // Show success message
      setTimeout(() => {
        navigate('/'); // Redirect to homepage after 2 seconds
      }, 2000);
    } catch (error) {
      console.error('Error logging in:', error);
      // Handle error (e.g., show error message to user)
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2>Login</h2>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
        <button type="submit" className="login-button">Login</button>
      </form>
      {success && <div className="success-popup">Login Successful! Redirecting...</div>}
    </div>
  );
};

export default LoginPage;
