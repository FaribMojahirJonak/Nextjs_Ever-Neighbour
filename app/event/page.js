"use client"

import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation'; 

const EventsPage = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter(); 

    const fetchEvents = async () => {
        try {
            const token = localStorage.getItem('token');
            if (token) {
                const response = await axios.get("http://localhost:3000/admin/viewevents", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setEvents(response.data);
                setLoading(false);
            } else {
                router.push('/login'); 
            }
        } catch (error) {
            console.error('Error fetching events:', error);
            setLoading(false);
            router.push('/login');
        }
    };

    useEffect(() => {
        fetchEvents();
    }, []);

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6">Events</h1>
                <Link href="/event/add-event" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded inline-block mb-6">
                    Add Event
                </Link>
            {loading ? (
                <p className="text-gray-700">Loading events, please wait...</p>
            ) : (
                <ul className="divide-y divide-gray-200">
                    {events.map(event => (
                        <li key={event.id} className="py-2"> {/* Reduced py-4 to py-2 */}
                            <div className="bg-white shadow-md rounded-md p-4 mb-2"> {/* Reduced p-6 to p-4 and mb-4 to mb-2 */}
                                <Link href={`/event/${event.id}`} className="text-blue-500 hover:underline text-lg">
                                    {event.eventName}
                                </Link>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default EventsPage;