"use client"

import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const ResidentsPage = () => {
    const [residents, setResidents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const router = useRouter();

    const fetchResidents = async () => {
        try {
            const token = localStorage.getItem('token');
            const email = localStorage.getItem('email');
            if(token) {
                const response = await axios.get("http://localhost:3000/admin/getallresidents", {
                    headers: {
                      Authorization: `Bearer ${token}`,
                    },
                });
                setResidents(response.data);
                setLoading(false);
            } 
            else {
                router.push('/login');
            }
        } catch (error) {
          console.error('Error fetching user data:', error);
          router.push('/login');
        } 
      };

    useEffect(() => {
        fetchResidents();
    }, []);

    useEffect(() => {
        const results = residents.filter(resident =>
            resident.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setSearchResults(results);
    }, [searchTerm, residents]);

    const handleResidentClick = (id) => {
        router.push(`/resident/${id}`);
    };

    return (
        <div>
          <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">Residents</h1>
            <div className="flex mb-4">
              <Link href="/resident/add-resident" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded inline-block mr-4">
                Add Resident
              </Link>
              <input
                type="text"
                placeholder="Search by name"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 w-3/5 text-black"
              />
            </div>
            {searchResults.length > 0 ? (
              <ul className="divide-y divide-gray-200">
                {searchResults.map(resident => (
                  <li key={resident.id} className="py-3">
                    <button
                      onClick={() => handleResidentClick(resident.id)}
                      className="block hover:bg-gray-50 rounded-md px-4 py-2 text-left w-full"
                    >
                      <span className="text-blue-500 hover:underline">{resident.name}</span>
                    </button>
                  </li>
                ))}
              </ul>
            ) : loading ? (
              <p className="text-gray-700">Getting all residents please wait!</p>
            ) : (
              <p className="text-gray-700">No results found</p>
            )}
          </div>
        </div>
      );
}
export default ResidentsPage;