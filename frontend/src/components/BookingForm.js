import React, { useState } from 'react';
import axios from 'axios';

const BookingForm = ({ roomId }) => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/bookings', { roomId, startDate, endDate });
      console.log(response.data);
      // Handle success (e.g., show confirmation to user)
    } catch (err) {
      console.error(err);
      // Handle error (e.g., show error message to user)
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} required />
      <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} required />
      <button type="submit">Book Room</button>
    </form>
  );
};

export default BookingForm;
