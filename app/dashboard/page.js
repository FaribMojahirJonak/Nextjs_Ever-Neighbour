"use client"

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { Toaster, toast } from 'react-hot-toast';
import 'react-toastify/dist/ReactToastify.css';

export default function Dashboard() {
    const router = useRouter();
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        password: '' // Added password field
    });
    const [errors, setErrors] = useState({});

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem('token');
                const email = localStorage.getItem('email');
                if (token) {
                    const response = await axios.get('http://localhost:3000/admin/getadmin/' + email, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });

                    setUser(response.data);
                    setFormData(response.data); // Set form data with user data
                    setLoading(false);
                } else {
                    router.push('/login');
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
                router.push('/login');
            }
        };

        fetchUserData();
    }, [router]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const validateForm = () => {
        let errors = {};
        let formIsValid = true;

        if (!formData.name) {
            errors.name = "Name is required";
            formIsValid = false;
        }

        if (!formData.phone) {
            errors.phone = "Phone number is required";
            formIsValid = false;
        } else if (!/^\d{10}$/.test(formData.phone)) {
            errors.phone = "Phone number must be 10 digits";
            formIsValid = false;
        }

        if (!formData.email) {
            errors.email = "Email is required";
            formIsValid = false;
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            errors.email = "Invalid email address";
            formIsValid = false;
        }

        setErrors(errors);
        return formIsValid;
    };

    const handleUpdate = async () => {
        if (validateForm()) {
            try {
                const token = localStorage.getItem('token');
                if (token) {
                    await axios.put(`http://localhost:3000/admin/updateadmin/${user.adminId}`, formData, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });

                    toast.success("Update successful");
                } else {
                    router.push('/login');
                }
            } catch (error) {
                console.error('Error updating user data:', error);
                // Handle error updating user data
            }
        }
    };

    return (
        <div className="container mx-auto p-4">
            <Toaster />
            <h1 className="text-3xl font-bold mb-4">Admin Details</h1>
            {loading ? (
                <div className="flex items-center justify-center h-screen">
                    <p className="text-gray-700">Loading...</p>
                </div>
            ) : (
                <div className="flex items-center">
                    <div className="w-1/3">
                        <img src={`http://localhost:3000/admin/getimage/${user.filename}`} alt="Admin Image" className="h-full w-full object-cover rounded-lg" />
                    </div>
                    <div className="w-2/3 pl-4">
                        <form>
                            <div className="mb-4">
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name:</label>
                                <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className={`mt-1 p-2 block w-full border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-black ${errors.name && 'border-red-500'}`}
                                />
                                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                            </div>
                            <div className="mb-4">
                                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone:</label>
                                <input
                                    type="text"
                                    name="phone"
                                    id="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className={`mt-1 p-2 block w-full border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-black ${errors.phone && 'border-red-500'}`}
                                />
                                {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                            </div>
                            <div className="mb-4">
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email:</label>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className={`mt-1 p-2 block w-full border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-black ${errors.email && 'border-red-500'}`}
                                />
                                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                            </div>
                            <div className="mb-4">
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password:</label>
                                <input
                                    type="password"
                                    name="password"
                                    id="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className={`mt-1 p-2 block w-full border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-black ${errors.password && 'border-red-500'}`}
                                />
                                {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                            </div>
                            <button
                                type="button"
                                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                                onClick={handleUpdate}
                            >
                                Update
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}