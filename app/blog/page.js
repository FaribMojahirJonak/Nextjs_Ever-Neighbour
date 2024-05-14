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
        <div>
            <h1>Blogs</h1>
            <Link href="/blog/add-blog">
                Add New Blog
            </Link>
            {loading ? (
                <p>Loading blogs please wait!</p>
            ) : (
                <ul className='mt-6'>
                    {blogs.map(blog => (
                        <li key={blog.id}>
                            <p><strong>Title:</strong> {blog.title}</p>
                            <p><strong>Body:</strong> {blog.body}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default BlogsPage;