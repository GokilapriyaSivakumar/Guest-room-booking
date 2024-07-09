import React, { useEffect, useState } from 'react';
import axios from 'axios';
import RoomCard from '../components/RoomCard';
import './HomePage.css'; // Import the CSS file

const HomePage = () => {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/rooms'); // Replace with your actual backend URL
        console.log('Rooms fetched: ', response.data); // Debugging log
        setRooms(response.data); // Assuming response.data is an array of rooms
      } catch (error) {
        console.error('Error fetching rooms:', error);
      }
    };

    fetchRooms();
  }, []);

  return (
    <div className="homepage-container">
      <h1>Rooms Available for Booking</h1>
      <div className="room-list">
        {rooms.map(room => (
          <RoomCard key={room._id} room={room} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
