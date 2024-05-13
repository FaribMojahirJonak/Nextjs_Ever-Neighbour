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
        <div>
            <h1>Add Resident</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Name:
                    <input type="text" name="name" value={formData.name} onChange={handleChange} style={{ color: 'black' }} required />
                </label>
                <label>
                    Email:
                    <input type="email" name="email" value={formData.email} onChange={handleChange} style={{ color: 'black' }} required />
                </label>
                <label>
                    Password:
                    <input type="password" name="password" value={formData.password} onChange={handleChange} style={{ color: 'black' }} required />
                </label>
                <label>
                    Phone:
                    <input type="text" name="phone" value={formData.phone} onChange={handleChange} style={{ color: 'black' }} required />
                </label>
                <button type="submit">Add Resident</button>
            </form>
        </div>
    );
};

export default AddResidentPage;