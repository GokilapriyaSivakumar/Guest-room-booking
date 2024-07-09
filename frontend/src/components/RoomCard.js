// src/components/RoomCard.js
import React from 'react';
import { Link } from 'react-router-dom';
import './RoomCard.css'; // CSS file for styling

const RoomCard = ({ room }) => {
  return (
    <div className="room-card">
      <img src={room.photo} alt={room.name} className="room-image" />
      <div className="room-details">
        <h2>{room.name}</h2>
        <p>{room.description}</p>
        <p>${room.rent} per day</p>
        <Link to={`/rooms/${room._id}`} className="details-link">View Details</Link>
      </div>
    </div>
  );
};

export default RoomCard;
