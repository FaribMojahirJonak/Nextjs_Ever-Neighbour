"use client"

import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

const BlogsPage = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchBlogs = async () => {
        try {
            const response = await axios.get("http://localhost:3000/admin/viewblogs");
            setBlogs(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching blogs:', error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBlogs();
    }, []);

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6">Blogs</h1>
            <Link href="/blog/add-blog" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-block mb-6">Add New Blog</Link>
            {loading ? (
                <p className="text-gray-700">Loading blogs, please wait...</p>
            ) : (
                <ul>
                    {blogs.map(blog => (
                        <li key={blog.id} className="mb-4 border-b border-gray-200 pb-4">
                            <h2 className="text-xl font-semibold mb-2">{blog.title}</h2>
                            <p className="text-gray-700">{blog.body}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default BlogsPage;