"use client"

import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

const EventsPage = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchEvents = async () => {
        try {
            const response = await axios.get("http://localhost:3000/admin/viewevents");
            setEvents(response.data);
            setLoading(false); // Mark loading as false after data is fetched
        } catch (error) {
            console.error('Error fetching events:', error);
            setLoading(false); // Mark loading as false in case of error too
        }
    };

    useEffect(() => {
        fetchEvents();
    }, []);

    return (
        <div>
            <h1>Events</h1>
            <Link href="/event/add-event">
                Add Event
            </Link>
            {loading ? (
                <p>Loading events please wait!</p>
            ) : (
                <ul className='mt-6'>
                    {events.map(event => (
                        <li key={event.id}>
                            <Link href={`/event/${event.id}`}>{event.eventName}</Link>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default EventsPage;