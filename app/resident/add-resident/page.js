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
    const [errors, setErrors] = useState({});
    const router = useRouter();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
        setErrors({
            ...errors,
            [name]: ''
        });
    };

    const validateForm = () => {
        let valid = true;
        const newErrors = {};
    
        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
            valid = false;
        }
    
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
            valid = false;
        } 
    
        if (!formData.password.trim()) {
            newErrors.password = 'Password is required';
            valid = false;
        } else if (formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters long';
            valid = false;
        }
    
        if (!formData.phone.trim()) {
            newErrors.phone = 'Phone is required';
            valid = false;
        } else if (!/^\d+$/.test(formData.phone)) {
            newErrors.phone = 'Phone must contain only digits';
            valid = false;
        }
    
        setErrors(newErrors);
        return valid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            console.log('Form data:', formData); 
            try {
                const token = localStorage.getItem('token');
                if(token) {
                    await axios.post('http://localhost:3000/admin/addresident', formData, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        }
                    });
                    router.push('/resident');

                } else {
                    router.push('/login')
                }
                 
            } catch (error) {
                console.error('Error adding resident:', error);
                router.push('../login');
            }
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">Add Resident</h1>
            <form onSubmit={handleSubmit}>
                <label className="block mb-2">
                    Name:
                    <input type="text" name="name" value={formData.name} onChange={handleChange} className={`mt-1 p-2 block w-full border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-black ${errors.name && 'border-red-500'}`} required />
                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                </label>
                <label className="block mb-2">
                    Email:
                    <input type="email" name="email" value={formData.email} onChange={handleChange} className={`mt-1 p-2 block w-full border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-black ${errors.email && 'border-red-500'}`} required />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                </label>
                <label className="block mb-2">
                    Password:
                    <input type="password" name="password" value={formData.password} onChange={handleChange} className={`mt-1 p-2 block w-full border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-black ${errors.password && 'border-red-500'}`} required />
                    {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                </label>
                <label className="block mb-2">
                    Phone:
                    <input type="text" name="phone" value={formData.phone} onChange={handleChange} className={`mt-1 p-2 block w-full border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-black ${errors.phone && 'border-red-500'}`} required />
                    {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                </label>
                <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded inline-block">Add Resident</button>
            </form>
        </div>
    );
};

export default AddResidentPage;