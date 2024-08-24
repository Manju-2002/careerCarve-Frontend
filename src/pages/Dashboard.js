import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
    const [appointments, setAppointments] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const response = await axios.get('/appointments'); // Ensure this endpoint is correct
                setAppointments(response.data);
            } catch (error) {
                setError('Error fetching appointments');
                console.error('Error fetching appointments:', error);
            }
        };

        fetchAppointments();
    }, []); // Empty dependency array means this runs once when the component mounts

    return (
        <div>
            <h1>Appointments</h1>
            {error && <p>{error}</p>}
            <ul>
                {appointments.map((appointment) => (
                    <li key={appointment.id}>{appointment.title}</li>
                ))}
            </ul>
        </div>
    );
};

export default Dashboard;
