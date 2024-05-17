"use client"

import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const AddBlogPage = () => {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [adminId, setAdminId] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleChangeTitle = (e) => {
        setTitle(e.target.value);
    };

    const handleChangeBody = (e) => {
        setBody(e.target.value);
    };

    const handleChangeAdminId = (e) => {
        setAdminId(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        
        try {
            const postData = {
                title: title,
                body: body,
                adminId: adminId
            };

            const token = localStorage.getItem('token'); // Replace this with your actual bearer token

            await axios.post(`http://localhost:3000/admin/addpost/${adminId}`, postData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            router.push('/blog'); // Redirect to blogs page after adding blog
        } catch (error) {
            console.error('Error adding blog:', error);
            setLoading(false);
            router.push('../login');
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6">Add Blog</h1>
            <form onSubmit={handleSubmit} className="max-w-md">
                <div className="mb-4">
                    <label htmlFor="adminId" className="block text-gray-700 text-sm font-bold mb-2">Admin ID:</label>
                    <input 
                        type="text" 
                        id="adminId"
                        value={adminId} 
                        onChange={handleChangeAdminId} 
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                        required 
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">Title:</label>
                    <input 
                        type="text" 
                        id="title"
                        value={title} 
                        onChange={handleChangeTitle} 
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                        required 
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="body" className="block text-gray-700 text-sm font-bold mb-2">Body:</label>
                    <textarea 
                        id="body"
                        value={body} 
                        onChange={handleChangeBody} 
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-32" 
                        required 
                    />
                </div>
                <button 
                    type="submit" 
                    disabled={loading} 
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                    {loading ? 'Adding...' : 'Add Blog'}
                </button>
            </form>
        </div>
    );
};

export default AddBlogPage;