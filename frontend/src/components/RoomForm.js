import React, { useState } from 'react';
import './RoomForm.css';
import PropTypes from 'prop-types'; 

const RoomForm = ({ onRoomCreated }) => {
  const initialFormData = {
    name: '',
    floorSize: '',
    numberOfBeds: 0,
    amenities: '',
    minBookingDays: 1,
    maxBookingDays: 30,
    rentPerDay: 0,
    photos: ''
  };
  
  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: name === 'numberOfBeds' || name === 'minBookingDays' || name === 'maxBookingDays' || name === 'rentPerDay' 
        ? value === '' ? '' : parseInt(value, 10)
        : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onRoomCreated(formData); 
    setFormData(initialFormData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Floor Size:
        <input
          type="text"
          name="floorSize"
          value={formData.floorSize}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Number of Beds:
        <input
          type="number"
          name="numberOfBeds"
          value={formData.numberOfBeds}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Amenities:
        <input
          type="text"
          name="amenities"
          value={formData.amenities}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Min Booking Days:
        <input
          type="number"
          name="minBookingDays"
          value={formData.minBookingDays}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Max Booking Days:
        <input
          type="number"
          name="maxBookingDays"
          value={formData.maxBookingDays}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Rent Per Day:
        <input
          type="number"
          name="rentPerDay"
          value={formData.rentPerDay}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Photos:
        <input
          type="text"
          name="photos"
          value={formData.photos}
          onChange={handleChange}
          required
        />
      </label>
      <button type="submit">Create</button>
    </form>
  );
};

RoomForm.propTypes = {
  onRoomCreated: PropTypes.func.isRequired,
};

export default RoomForm;
