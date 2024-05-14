"use client"
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const AddResidentPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        phone: ''
    });

    const router = useRouter();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:3000/admin/addresident', formData);
            router.push('/resident'); // Redirect to residents page after adding resident
        } catch (error) {
            console.error('Error adding resident:', error);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">Add Resident</h1>
            <form onSubmit={handleSubmit}>
                <label className="block mb-2">
                    Name:
                    <input type="text" name="name" value={formData.name} onChange={handleChange} className="mt-1 p-2 block w-full border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-black" required />
                </label>
                <label className="block mb-2">
                    Email:
                    <input type="email" name="email" value={formData.email} onChange={handleChange} className="mt-1 p-2 block w-full border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-black" required />
                </label>
                <label className="block mb-2">
                    Password:
                    <input type="password" name="password" value={formData.password} onChange={handleChange} className="mt-1 p-2 block w-full border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-black" required />
                </label>
                <label className="block mb-2">
                    Phone:
                    <input type="text" name="phone" value={formData.phone} onChange={handleChange} className="mt-1 p-2 block w-full border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-black" required />
                </label>
                <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded inline-block">Add Resident</button>
            </form>
        </div>
    );
};

export default AddResidentPage;