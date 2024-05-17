"use client"

import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const AddEventPage = () => {
    const router = useRouter();
    const [eventName, setEventName] = useState('');
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleChangeEventName = (e) => {
        setEventName(e.target.value);
    };

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        
        try {
            const formData = new FormData();
            formData.append('eventName', eventName);
            formData.append('myfile', image);
            const token = localStorage.getItem('token');
            console.log(token);
            if (token) {
                await axios.post('http://localhost:3000/admin/addevent', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${token}`,
                    },
                });
                setLoading(false);
                setEventName('');
                setImage(null);
                router.push('/event'); 
            } else {
                router.push('../login');
            }

            
        } catch (error) {
            console.error('Error adding event:', error);
            setLoading(false);
            router.push('/login');
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6">Add Event</h1>
            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="eventName">
                        Event Name:
                    </label>
                    <input 
                        id="eventName"
                        type="text" 
                        value={eventName} 
                        onChange={handleChangeEventName}
                        className="mt-1 p-2 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 text-black" 
                        required 
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="eventImage">
                        Event Image:
                    </label>
                    <input 
                        id="eventImage"
                        type="file" 
                        onChange={handleImageChange} 
                        accept="image/*" 
                        className="mt-1 w-full"
                        required 
                    />
                </div>
                <div className="text-center">
                    <button 
                        type="submit" 
                        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                        disabled={loading}
                    >
                        {loading ? 'Adding...' : 'Add Event'}
                    </button>
                </div>
            </form>
            <Link href="/event" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-block">Back to Events</Link>
        </div>
    );
};

export default AddEventPage;