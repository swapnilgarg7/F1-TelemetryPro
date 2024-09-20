"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Calendar() {
    const [races, setRaces] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const router = useRouter();

    useEffect(() => {
        // Fetch race sessions for the current season from Ergast API
        const fetchRaces = async () => {
            try {
                const response = await axios.get("http://ergast.com/api/f1/current.json");
                const racesData = response.data.MRData.RaceTable.Races;

                // Sort races by date
                const sortedRaces = racesData.sort((a, b) => new Date(a.date) - new Date(b.date));
                setRaces(sortedRaces);
                setLoading(false);
            } catch (err) {
                console.error(err);
                setError("Failed to load race sessions.");
                setLoading(false);
            }
        };

        fetchRaces();
    }, []);

    if (loading) {
        return <p className="text-center">Loading race calendar...</p>;
    }

    if (error) {
        return <p className="text-center text-red-500">{error}</p>;
    }

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate();
        const month = date.toLocaleString('default', { month: 'long' });
        return `${day}${getDaySuffix(day)} ${month}`;
    };

    const getDaySuffix = (day) => {
        if (day >= 11 && day <= 13) {
            return 'th';
        }
        switch (day % 10) {
            case 1: return 'st';
            case 2: return 'nd';
            case 3: return 'rd';
            default: return 'th';
        }
    };

    return (
        <div className="min-h-screen p-8 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            <h1 className="text-2xl font-bold text-center mb-8">Race Calendar</h1>

            <table className="w-full table-auto border-collapse text-left">
                <thead>
                    <tr className="bg-gray-200 dark:bg-gray-800">
                        <th className="p-4 border">Date</th>
                        <th className="p-4 border">Country</th>
                        <th className="p-4 border">Location</th>
                    </tr>
                </thead>
                <tbody>
                    {races.map((race) => (
                        <tr key={race.round} className="hover:bg-gray-100 dark:hover:bg-gray-700">
                            <td className="p-4 border">{formatDate(race.date)}</td>
                            <td className="p-4 border">{race.Circuit.Location.country}</td>
                            <td className="p-4 border">{race.Circuit.circuitName}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <footer className="mt-16 text-center">
                <a href="/" className="text-blue-500 hover:underline">
                    Back to Home
                </a>
            </footer>
        </div>
    );
}
