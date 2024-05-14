"use client"

import { useEffect, useState } from 'react';
import axios from 'axios';
import Image from 'next/image';

const EventDetailPage = ({ params }) => {
    const { id } = params; // Get the eventId from the route parameters
    const [event, setEvent] = useState({});
    console.log(id);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEventDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/admin/geteventbyid/${id}`);
                setEvent(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching event details:', error);
                setLoading(false);
            }
        };

        if (id) {
            fetchEventDetails();
        }
    }, [id]);

    return (
        <div>
            {loading ? (
                <p>Loading event details...</p>
            ) : event ? (
                <div>
                    <h1>{event.eventName}</h1>
                    <Image
                        src={`http://localhost:3000/uploads/${event.filename}`}
                        alt={event.eventName}
                        width={500} // Specify the width of the image
                        height={300} // Specify the height of the image
                    />
                </div>
            ) : (
                <p>Event not found!</p>
            )}
        </div>
    );
};

export default EventDetailPage;