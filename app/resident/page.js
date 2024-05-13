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
        <div>
            <h1>Residents</h1>
            <Link href="/resident/add-resident">
                Add Resident
            </Link>
            {loading ? (
                <p>Getting all residents please wait!</p>
            ) : (
                <ul className='mt-6'>
                    {residents.map(resident => (
                        <li key={resident.id}>
                            <Link href={`/resident/${resident.id}`}>{resident.name}</Link>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default ResidentsPage;