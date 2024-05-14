"use client"

import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

const ResidentsPage = () => {
    const [residents, setResidents] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchResidents = async () => {
        try {
            const response = await axios.get("http://localhost:3000/admin/getallresidents");
            setResidents(response.data);
            setLoading(false); // Mark loading as false after data is fetched
        } catch (error) {
            console.error('Error fetching residents:', error);
            setLoading(false); // Mark loading as false in case of error too
        }
    };

    useEffect(() => {
        fetchResidents();
    }, []);

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">Residents</h1>
            <Link href="/resident/add-resident" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded inline-block mb-4">
                Add Resident
            </Link>
            {loading ? (
                <p className="text-gray-700">Getting all residents please wait!</p>
            ) : (
                <ul className="divide-y divide-gray-200">
                    {residents.map(resident => (
                        <li key={resident.id} className="py-3">
                            <Link href={`/resident/${resident.id}`} className="block hover:bg-gray-50 rounded-md px-4 py-2">
                                <span className="text-blue-500 hover:underline">{resident.name}</span>
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default ResidentsPage;