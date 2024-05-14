"use client"

import { useEffect, useState } from 'react';
import axios from 'axios';
import Image from 'next/image';

const EventDetailPage = ({ params }) => {
    const { id } = params;
    const [event, setEvent] = useState({});
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
        <div className="max-w-4xl px-4 py-8"> {/* Removed mx-auto */}
            {loading ? (
                <p className="text-gray-600 text-lg">Loading event details...</p>
            ) : event ? (
                <div>
                    <h1 className="text-3xl font-bold mb-4">{event.eventName}</h1>
                    <div className="max-w-lg mx-auto">
                        <Image
                            src={`http://localhost:3000/uploads/${event.filename}`}
                            alt={event.eventName}
                            width={500}
                            height={300}
                            className="rounded-lg"
                        />
                    </div>
                </div>
            ) : (
                <p className="text-red-500 text-lg">Event not found!</p>
            )}
        </div>
    );
};

export default EventDetailPage;