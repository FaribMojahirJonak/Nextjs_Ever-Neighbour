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

            await axios.post(`http://localhost:3000/admin/addpost/${adminId}`, postData);
            router.push('/blog'); // Redirect to blogs page after adding blog
        } catch (error) {
            console.error('Error adding blog:', error);
            setLoading(false);
        }
    };

    return (
        <div>
            <h1>Add Blog</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Admin ID:
                    <input 
                        type="text" 
                        value={adminId} 
                        onChange={handleChangeAdminId} 
                        style={{ color: 'black' }} 
                        required 
                    />
                </label>
                <label>
                    Title:
                    <input 
                        type="text" 
                        value={title} 
                        onChange={handleChangeTitle} 
                        style={{ color: 'black' }} 
                        required 
                    />
                </label>
                <label>
                    Body:
                    <textarea 
                        value={body} 
                        onChange={handleChangeBody} 
                        style={{ color: 'black' }} 
                        required 
                    />
                </label>
                <button type="submit" disabled={loading}>{loading ? 'Adding...' : 'Add Blog'}</button>
            </form>
        </div>
    );
};

export default AddBlogPage;