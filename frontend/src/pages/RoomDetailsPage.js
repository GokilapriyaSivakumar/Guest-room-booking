// src/pages/RoomDetailsPage.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './RoomDetailsPage.css'; // CSS file for styling

const RoomDetailsPage = () => {
  const { id } = useParams();
  const [room, setRoom] = useState(null);
  const [availability, setAvailability] = useState([]);
  const [dates, setDates] = useState({ start: '', end: '' });
  const [bookingSuccess, setBookingSuccess] = useState(false);

  useEffect(() => {
    const fetchRoomDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5001/api/rooms/${id}`);
        setRoom(response.data);
      } catch (error) {
        console.error('Error fetching room details:', error);
      }
    };

    const fetchAvailability = async () => {
      try {
        const response = await axios.get(`http://localhost:5001/api/rooms/${id}/availability`);
        setAvailability(response.data);
      } catch (error) {
        console.error('Error fetching availability:', error);
      }
    };

    fetchRoomDetails();
    fetchAvailability();
  }, [id]);

  const handleBooking = async () => {
    try {
      await axios.post(`http://localhost:5001/api/rooms/${id}/book`, dates);
      setBookingSuccess(true);
      // Refresh availability after booking
      const response = await axios.get(`http://localhost:5001/api/rooms/${id}/availability`);
      setAvailability(response.data);
    } catch (error) {
      console.error('Error booking room:', error);
    }
  };

  return (
    <div className="room-details-container">
      {room && (
        <>
          <h1>{room.name}</h1>
          <img src={room.photo} alt={room.name} className="room-details-image" />
          <p>{room.description}</p>
          <p>${room.rent} per day</p>
          <h2>Availability</h2>
          <div className="availability-calendar">
            {availability.map((date, index) => (
              <span key={index} className="availability-date">{date}</span>
            ))}
          </div>
          <div className="booking-form">
            <input 
              type="date" 
              value={dates.start} 
              onChange={(e) => setDates({ ...dates, start: e.target.value })} 
              placeholder="Start Date" 
            />
            <input 
              type="date" 
              value={dates.end} 
              onChange={(e) => setDates({ ...dates, end: e.target.value })} 
              placeholder="End Date" 
            />
            <button onClick={handleBooking} className="book-button">Book</button>
          </div>
          {bookingSuccess && <div className="success-popup">Booking Successful!</div>}
        </>
      )}
    </div>
  );
};

export default RoomDetailsPage;
