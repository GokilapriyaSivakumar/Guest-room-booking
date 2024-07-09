import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './RegisterPage.css'; // Assuming you will add CSS in this file

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isOwner, setIsOwner] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5001/api/users/register', { name, email, password, isOwner });
      setMessage('Registration successful');
      console.log(response.data);
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (err) {
      console.error(err);
      setMessage('Error registering. Please try again.');
    }
  };

  return (
    <div className="register-container">
      <form onSubmit={handleSubmit}>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" required />
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
        <label>
          <input type="checkbox" checked={isOwner} onChange={(e) => setIsOwner(e.target.checked)} />
          Are you a house owner?
        </label>
        <button type="submit">Register</button>
      </form>
      {message && <div className="popup-message">{message}</div>}
    </div>
  );
};

export default RegisterPage;
