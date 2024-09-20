"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { ChevronDown, ChevronUp, Home } from "lucide-react";

export default function Calendar() {
    const [races, setRaces] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedRace, setSelectedRace] = useState(null);
    const [fetchingWinners, setFetchingWinners] = useState(false);

    useEffect(() => {
        const fetchRaces = async () => {
            try {
                const response = await axios.get("http://ergast.com/api/f1/current.json");
                const racesData = response.data.MRData.RaceTable.Races;
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

    const fetchWinners = async (round) => {
        setFetchingWinners(true);
        try {
            const response = await axios.get(`https://ergast.com/api/f1/current/${round}/results.json`);
            const winnersData = response.data.MRData.RaceTable.Races[0].Results.slice(0, 3);
            setFetchingWinners(false);
            return winnersData;
        } catch (err) {
            console.error(err);
            setFetchingWinners(false);
            return null;
        }
    };

    const handleRaceClick = async (race) => {
        if (new Date(race.date) > new Date()) return; // Prevent clicking on future races
        if (selectedRace?.round === race.round) {
            setSelectedRace(null);
        } else {
            setSelectedRace({ ...race, winners: null });
            const winners = await fetchWinners(race.round);
            setSelectedRace(prevState => ({ ...prevState, winners }));
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-900">
                <div className="animate-spin rounded-full h-32 w-32 border-b-4 border-blue-500"></div>
            </div>
        );
    }


    if (error) {
        return <p className="text-center text-red-400">{error}</p>;
    }

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate();
        const month = date.toLocaleString('default', { month: 'long' });
        return `${day}${getDaySuffix(day)} ${month}`;
    };

    const getDaySuffix = (day) => {
        if (day >= 11 && day <= 13) return 'th';
        switch (day % 10) {
            case 1: return 'st';
            case 2: return 'nd';
            case 3: return 'rd';
            default: return 'th';
        }
    };

    const today = new Date();
    const upcomingRaceIndex = races.findIndex(race => new Date(race.date) > today);

    return (
        <div className="min-h-screen p-8 sm:p-20 font-sans bg-gray-900 text-gray-100">
            <div className="flex justify-between items-center mb-8">
                <a href="/" className="text-blue-400 hover:text-blue-300 transition-colors duration-200">
                    <Home size={24} />
                </a>
                <h1 className="text-3xl font-bold text-center text-gray-100">F1 Race Calendar</h1>
                <div className="w-6"></div> {/* This empty div balances the layout */}
            </div>

            <div className="grid grid-cols-1 gap-6">
                {races.map((race, index) => {
                    const raceDate = new Date(race.date);
                    const isOver = raceDate < today;
                    const isUpcoming = index === upcomingRaceIndex;
                    const isFuture = raceDate > today && !isUpcoming;
                    const isSelected = selectedRace?.round === race.round;

                    return (
                        <div
                            key={race.round}
                            className={`p-6 border rounded-lg shadow-md transition-all duration-300
                                ${isOver ? "bg-green-800 border-green-700 cursor-pointer" :
                                    isUpcoming ? "bg-blue-900 border-blue-700 opacity-90" :
                                        isFuture ? "bg-gray-800 border-gray-700 opacity-50" :
                                            "bg-gray-800 border-gray-700"}
                                ${isSelected ? "shadow-lg ring-2 ring-blue-500" :
                                    isOver || isUpcoming ? "hover:shadow-lg hover:bg-opacity-80" : ""}`}
                            onClick={() => handleRaceClick(race)}
                        >
                            <div className="flex justify-between items-center">
                                <div>
                                    <h2 className="text-xl font-semibold text-gray-100">{race.Circuit.circuitName}</h2>
                                    <p className="text-lg text-gray-300">{formatDate(race.date)}</p>
                                    <p className="text-md text-gray-400">{race.Circuit.Location.country}</p>
                                    {isUpcoming && <span className="mt-2 inline-block bg-blue-500 text-blue-100 text-xs px-2 py-1 rounded">Upcoming</span>}
                                </div>
                                {(isOver) && (isSelected ? <ChevronUp size={24} /> : <ChevronDown size={24} />)}
                            </div>

                            {isSelected && (isOver || isUpcoming) && (
                                <div className="mt-4 overflow-hidden transition-all duration-300 animate-expand">
                                    {fetchingWinners || !selectedRace.winners ? (
                                        <p className="text-gray-400">Fetching winners...</p>
                                    ) : (
                                        <>
                                            <h3 className="text-lg font-semibold mb-2 text-gray-200">Top 3 Winners</h3>
                                            <ul className="list-disc pl-6">
                                                {selectedRace.winners.map((winner, index) => (
                                                    <li key={index} className="text-md text-gray-300">
                                                        {winner.position}. {winner.Driver.givenName} {winner.Driver.familyName} ({winner.Constructor.name})
                                                    </li>
                                                ))}
                                            </ul>
                                        </>
                                    )}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

            <footer className="mt-16 text-center">
                <a href="/" className="text-blue-400 hover:underline">
                    Back to Home
                </a>
            </footer>
        </div>
    );
}