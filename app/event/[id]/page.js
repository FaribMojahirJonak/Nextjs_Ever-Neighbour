"use client"
import { useEffect, useState } from 'react';
import axios from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/navigation'; // Import useRouter

const EventDetailPage = ({ params }) => {
    const { id } = params;
    const [event, setEvent] = useState({});
    const [loading, setLoading] = useState(true);
    const router = useRouter(); // Initialize router

    useEffect(() => {
        const fetchEventDetails = async () => {
            try {
                const token = localStorage.getItem('token');
                if (token) {
                    const response = await axios.get(`http://localhost:3000/admin/geteventbyid/${id}`, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    setEvent(response.data);
                    setLoading(false);
                } else {
                    router.push('../login');
                }

            } catch (error) {
                console.error('Error fetching event details:', error);
                setLoading(false);
                router.push('../login');

            }
        };

        if (id) {
            fetchEventDetails();
        }
    }, [id]);

    const handleDelete = async () => {
        const confirmation = window.confirm('Are you sure you want to delete this event?');
        if (confirmation) {
            try {
                const token = localStorage.getItem('token');
                if (token) {
                    await axios.delete(`http://localhost:3000/admin/deleteevent/${id}`, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    // After successful deletion, navigate to another page
                    router.push('/event'); // Example: Redirect to events page
                } else {
                    router.push('../login');

                }

            } catch (error) {
                console.error('Error deleting event:', error);
                router.push('../login');
            }
        }
    };

    return (
        <div className="max-w-4xl px-4 py-8">
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
                    <button onClick={handleDelete} className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg">
                        Delete Event
                    </button>
                </div>
            ) : (
                <p className="text-red-500 text-lg">Event not found!</p>
            )}
        </div>
    );
};

export default EventDetailPage;