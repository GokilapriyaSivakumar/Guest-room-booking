import React, { useEffect, useState } from 'react';
import axios from 'axios';
import RoomForm from '../components/RoomForm';
import './OwnerDashboard.css';

const OwnerDashboard = () => {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/rooms');
        setRooms(response.data);
      } catch (error) {
        console.error('Error fetching rooms:', error);
      }
    };

    fetchRooms();
  }, []);

  const handleRoomCreated = async (formData) => {
    try {
      const response = await axios.post('http://localhost:5001/api/rooms', formData);
      console.log('Room created:', response.data);
      setRooms([...rooms, response.data]);
    } catch (error) {
      console.error('Error creating room:', error);
    }
  };

  return (
    <div className="owner-dashboard">
      <h1>Owner Dashboard</h1>
      <div className="room-form">
        <RoomForm onRoomCreated={handleRoomCreated} />
      </div>
      <div className="room-list">
        {rooms.map(room => (
          <div key={room._id} className="room-item">
            <h2>{room.name}</h2>
            <p>{room.description}</p>
            <p>Price: ₹{room.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OwnerDashboard;
