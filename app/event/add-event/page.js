"use client"

import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const AddEventPage = () => {
    const [eventName, setEventName] = useState('');
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

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

            await axios.post('http://localhost:3000/admin/addevent', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            router.push('/event'); // Redirect to events page after adding event
        } catch (error) {
            console.error('Error adding event:', error);
            setLoading(false);
        }
    };

    return (
        <div>
            <h1>Add Event</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Event Name:
                    <input 
                        type="text" 
                        value={eventName} 
                        onChange={handleChangeEventName}
                        style={{ color: 'black' }}  
                        required 
                    />
                </label>
                <label>
                    Event Image:
                    <input 
                        type="file" 
                        onChange={handleImageChange} 
                        accept="image/*" 
                        required 
                    />
                </label>
                <button type="submit" disabled={loading}>{loading ? 'Adding...' : 'Add Event'}</button>
            </form>
        </div>
    );
};

export default AddEventPage;