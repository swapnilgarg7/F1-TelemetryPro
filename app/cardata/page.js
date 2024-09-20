"use client";

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Home } from "lucide-react";
import Link from 'next/link';

const CarDataPage = () => {
    const [telemetryData, setTelemetryData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const searchParams = useSearchParams();
    const driverNumber = searchParams.get('driverNumber');

    useEffect(() => {
        const fetchTelemetryData = async () => {
            if (!driverNumber) return;

            try {
                const response = await fetch(`https://api.openf1.org/v1/car_data?meeting_key=latest&driver_number=${driverNumber}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const data = await response.json();
                setTelemetryData(data[0]); // Assuming we want the first entry
            } catch (error) {
                console.error('Error fetching telemetry data:', error);
                setError(error.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchTelemetryData();
    }, [driverNumber]);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
                <div className="animate-spin rounded-full h-32 w-32 border-b-4 border-blue-500"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
                <h1 className="text-2xl font-bold mb-4">Error</h1>
                <p>{error}</p>
                <Link href="/" className="mt-4 text-blue-400 hover:underline">
                    Back to Home
                </Link>
            </div>
        );
    }

    return (
        <div className="bg-gray-900 min-h-screen p-8 font-[family-name:var(--font-geist-sans)] text-white">
            <header className="text-center mb-12">
                <Link href="/telemetry" className="text-blue-400 hover:text-blue-300 transition-colors duration-200">
                    <Home size={24} />
                </Link>
                <h1 className="text-3xl font-bold mt-4">Car Telemetry Data</h1>
            </header>

            <main className="max-w-4xl mx-auto">
                {telemetryData ? (
                    <div className="bg-gray-800 rounded-lg shadow-lg p-6">
                        <h2 className="text-2xl font-bold mb-4">Driver Number: {driverNumber}</h2>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <p className="font-semibold">Date:</p>
                                <p>{new Date(telemetryData.date).toLocaleString()}</p>
                            </div>
                            <div>
                                <p className="font-semibold">RPM:</p>
                                <p>{telemetryData.rpm}</p>
                            </div>
                            <div>
                                <p className="font-semibold">Speed:</p>
                                <p>{telemetryData.speed} km/h</p>
                            </div>
                            <div>
                                <p className="font-semibold">Gear:</p>
                                <p>{telemetryData.gear}</p>
                            </div>
                            <div>
                                <p className="font-semibold">Throttle:</p>
                                <p>{telemetryData.throttle}%</p>
                            </div>
                            <div>
                                <p className="font-semibold">Brake:</p>
                                <p>{telemetryData.brake}%</p>
                            </div>
                            <div>
                                <p className="font-semibold">DRS:</p>
                                <p>{telemetryData.drs ? 'Activated' : 'Not Activated'}</p>
                            </div>
                        </div>
                    </div>
                ) : (
                    <p className="text-center">No telemetry data available for this driver.</p>
                )}
            </main>

            <footer className="mt-16 text-center">
                <Link href="/telemetry" className="text-blue-400 hover:underline">
                    Back to Driver Selection
                </Link>
            </footer>
        </div>
    );
};

export default CarDataPage;