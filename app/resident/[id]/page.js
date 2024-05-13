"use client"
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const ResidentPage = ({ params }) => {
    const router = useRouter();
    const { id } = params;
    const [resident, setResident] = useState({});
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({ name: '', phone: '', email: '' });

    const fetchResident = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/admin/getresidentbyid/${id}`);
            setResident(response.data || {});
            setFormData(response.data || {});
            setLoading(false);
        } catch (error) {
            console.error('Error fetching resident:', error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchResident();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleUpdate = async () => {
        try {
            await axios.put(`http://localhost:3000/admin/updateresident/${id}`, formData);
            fetchResident(); // Refresh resident data after update
            router.push('/resident'); // Navigate back to all residents page
        } catch (error) {
            console.error('Error updating resident:', error);
        }
    };

    const handleDelete = async () => {
        // Display confirmation dialog
        const confirmDelete = window.confirm("Are you sure you want to delete this resident?");
        
        if (confirmDelete) {
            try {
                await axios.delete(`http://localhost:3000/admin/deleteresident/${id}`);
                router.push('/resident'); // Navigate back to all residents page
            } catch (error) {
                console.error('Error deleting resident:', error);
            }
        }
    };

    return (
        <div>
            <h1>Resident Details</h1>
            {loading ? (
                <p>Getting resident please wait!</p>
            ) : (
                <div>
                    <form>
                        <label>
                            Name:
                            <input type="text" name="name" value={formData.name} onChange={handleChange} style={{ color: 'black' }} />
                        </label>
                        <label>
                            Phone Number:
                            <input type="text" name="phone" value={formData.phone} onChange={handleChange} style={{ color: 'black' }} />
                        </label>
                        <label>
                            Email:
                            <input type="email" name="email" value={formData.email} onChange={handleChange} style={{ color: 'black' }} />
                        </label>
                    </form>
                    <button onClick={handleUpdate}>Update</button>
                    <button onClick={handleDelete}>Delete</button>
                </div>
            )}
        </div>
    );
};

export default ResidentPage;