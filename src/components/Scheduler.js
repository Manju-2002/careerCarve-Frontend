import React, { useState, useEffect } from 'react';
import BookingForm from './BookingForm';
import api from '../services/api';

function Scheduler() {
  const [slots, setSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const fetchSlots = async () => {
      try {
        const response = await api.get('/slots');
        setSlots(response.data);
      } catch (error) {
        alert('Failed to fetch available slots.');
      }
    };
    fetchSlots();
  }, []);

  const handleSlotClick = (slot) => {
    setSelectedSlot(slot);
    setShowForm(true);
  };

  return (
    <div>
      <h2>Schedule a Session</h2>
      <ul>
        {slots.map((slot) => (
          <li key={slot.id} onClick={() => handleSlotClick(slot)}>
            {slot.date} - {slot.time}
          </li>
        ))}
      </ul>

      {showForm && (
        <BookingForm
          slot={selectedSlot}
          onClose={() => setShowForm(false)}
        />
      )}
    </div>
  );
}

export default Scheduler;
