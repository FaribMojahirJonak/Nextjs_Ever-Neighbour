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
            setLoading(false); // Mark loading as false after data is fetched
        } catch (error) {
            console.error('Error fetching blogs:', error);
            setLoading(false); // Mark loading as false in case of error too
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
                            <p>{blog.title}</p>
                            <p>{blog.body}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default BlogsPage;