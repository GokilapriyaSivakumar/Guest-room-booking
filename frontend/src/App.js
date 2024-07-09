import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import HomePage from './pages/HomePage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import OwnerDashboard from './pages/OwnerDashboard';
import RoomDetailsPage from './pages/RoomDetailsPage';

function App() {
  const owner = { _id: 'yourOwnerIdHere' }; // Define owner object with _id

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/owner-dashboard" element={<OwnerDashboard owner={owner} />} />
        <Route path="/rooms/:id" element={<RoomDetailsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
