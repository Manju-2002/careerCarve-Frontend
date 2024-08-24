import React, { useState } from 'react';
import api from '../services/api';

function BookingForm({ slot, onClose }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/book', {
        slotId: slot.id,
        name,
        email,
      });
      alert('Booking confirmed!');
      onClose();
    } catch (error) {
      alert('Failed to book the slot.');
    }
  };

  return (
    <div>
      <h3>Book a Slot</h3>
      <p>
        You are booking the slot on {slot.date} at {slot.time}.
      </p>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button type="submit">Confirm Booking</button>
        <button type="button" onClick={onClose}>
          Cancel
        </button>
      </form>
    </div>
  );
}

export default BookingForm;
