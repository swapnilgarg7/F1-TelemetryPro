"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";

export default function Telemetry() {
    const [telemetryData, setTelemetryData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch telemetry data from the OpenF1 API
        const fetchTelemetryData = async () => {
            try {
                const response = await axios.get(
                    "https://api.openf1.org/v1/car_data",
                    {
                        params: {
                            driver_number: "55",
                            session_key: "9159",
                            speed: "315"
                        },
                    }
                );
                setTelemetryData(response.data[0]);
                console.log(telemetryData);
                setLoading(false);
            } catch (err) {
                console.error(err);
                setError("Failed to load telemetry data.");
                setLoading(false);
            }
        };

        fetchTelemetryData();
    }, []);

    if (loading) {
        return <p className="text-center">Loading telemetry data...</p>;
    }

    if (error) {
        return <p className="text-center text-red-500">{error}</p>;
    }

    return (
        <div className="bg-gray-900 min-h-screen p-8 pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            <div className="flex justify-between items-center mb-8 flex-col">
                <h1 className="text-2xl font-bold text-center mb-8">Telemetry Dashboard</h1>
                <a
                    href="/drivers"
                    className="w-full max-w-xl rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-blue-600 text-white gap-2 hover:bg-blue-700 text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
                >
                    View Drivers
                </a>
            </div>

            {telemetryData ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    {/* Display telemetry data from OpenF1 API */}
                    <div className="p-4 bg-gray-200 dark:bg-gray-800 rounded-lg">
                        <h2 className="text-xl font-semibold">Speed</h2>
                        <p>{telemetryData.speed} km/h</p>
                    </div>
                    <div className="p-4 bg-gray-200 dark:bg-gray-800 rounded-lg">
                        <h2 className="text-xl font-semibold">Throttle</h2>
                        <p>{telemetryData.throttle} %</p>
                    </div>
                    <div className="p-4 bg-gray-200 dark:bg-gray-800 rounded-lg">
                        <h2 className="text-xl font-semibold">Brake</h2>
                        <p>{telemetryData.brake} %</p>
                    </div>
                    <div className="p-4 bg-gray-200 dark:bg-gray-800 rounded-lg">
                        <h2 className="text-xl font-semibold">Gear</h2>
                        <p>{telemetryData.n_gear}</p>
                    </div>
                    <div className="p-4 bg-gray-200 dark:bg-gray-800 rounded-lg">
                        <h2 className="text-xl font-semibold">RPM</h2>
                        <p>{telemetryData.rpm}</p>
                    </div>
                    <div className="p-4 bg-gray-200 dark:bg-gray-800 rounded-lg">
                        <h2 className="text-xl font-semibold">DRS</h2>
                        <p>{telemetryData.drs}</p>
                    </div>
                    <div className="p-4 bg-gray-200 dark:bg-gray-800 rounded-lg">
                        <h2 className="text-xl font-semibold">Driver Number</h2>
                        <p>{telemetryData.driver_number}</p>
                    </div>
                    <div className="p-4 bg-gray-200 dark:bg-gray-800 rounded-lg">
                        <h2 className="text-xl font-semibold">Date</h2>
                        <p>{new Date(telemetryData.date).toLocaleString()}</p>
                    </div>
                </div>
            ) : (
                <p>No telemetry data available.</p>
            )}

            <footer className="mt-16 text-center">
                <a href="/" className="text-blue-500 hover:underline">
                    Back to Home
                </a>
            </footer>
        </div>
    );
}
