"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";

export default function RaceDetails() {
    const [raceDetails, setRaceDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const search = useSearchParams();
    const session_key = search.get("session_key");

    useEffect(() => {
        if (!session_key) return;

        const fetchRaceDetails = async () => {
            try {
                const response = await axios.get(
                    "https://api.openf1.org/v1/sessions?year=2024&session_name=Race&session_key=" + session_key,
                    {
                        headers: {
                        },

                    }
                );
                setRaceDetails(response.data);
                setLoading(false);
            } catch (err) {
                console.error(err);
                setError("Failed to load race details.");
                setLoading(false);
            }
        };

        fetchRaceDetails();
    }, [session_key]);

    if (loading) {
        return <p className="text-center">Loading race details...</p>;
    }

    if (error) {
        return <p className="text-center text-red-500">{error}</p>;
    }

    return (
        <div className="min-h-screen p-8 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            <h1 className="text-2xl font-bold text-center mb-8">
                {raceDetails.location} - {new Date(raceDetails.date_start).toLocaleDateString()}
            </h1>

            <div className="grid gap-4 p-4 bg-gray-200 dark:bg-gray-800 rounded-lg">
                <p><strong>Location:</strong> {raceDetails.location}, {raceDetails.country_name}</p>
                <p><strong>Circuit:</strong> {raceDetails.circuit_short_name}</p>
                <p><strong>Session Start:</strong> {new Date(raceDetails.date_start).toLocaleString()}</p>
                <p><strong>Session End:</strong> {new Date(raceDetails.date_end).toLocaleString()}</p>
                <p><strong>GMT Offset:</strong> {raceDetails.gmt_offset}</p>
            </div>

            <footer className="mt-16 text-center">
                <a href="/calendar" className="text-blue-500 hover:underline">
                    Back to Calendar
                </a>
            </footer>
        </div>
    );
}
