"use client";

export default function About() {
    return (
        <div className="bg-gray-900 min-h-screen p-8 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            <h1 className="text-3xl font-bold text-center mb-8">About F1-TelemetryPro</h1>
            <p className="mb-4 text-lg">
                Welcome to F1-TelemetryPro! This site is dedicated to providing F1 fans with real-time information and insights into the exciting world of Formula 1 racing.
            </p>
            <p className="mb-4 text-lg">
                Here, you can explore race calendars, telemetry data, and much more to enhance your F1 experience.
            </p>

            <h2 className="text-2xl font-semibold mt-6 mb-4">APIs Used</h2>
            <h3 className="text-xl font-semibold mb-2">OpenF1 API</h3>
            <p className="mb-4 text-lg">
                We utilize the OpenF1 API to fetch real-time telemetry data and performance metrics from Formula 1 races. This allows fans and analysts to dive deep into car performance, driver stats, and session results.
            </p>

            <h3 className="text-xl font-semibold mb-2">Ergast API</h3>
            <p className="mb-4 text-lg">
                The Ergast API serves as our source for race calendars and historical data. By using this API, we provide users with up-to-date information on upcoming races, including dates, locations, and circuit details.
            </p>

            <p className="mb-4 text-lg">
                We aim to create an engaging platform for F1 enthusiasts, providing them with the tools and data they need to enhance their understanding and enjoyment of the sport.
            </p>

            <h2 className="text-2xl font-semibold mt-6 mb-4">Created By</h2>
            <p className="text-lg font-semibold mb-2">Swapnil Garg
                <a href="https://www.linkedin.com/in/swapniltech/"
                    target="_blank"
                    className="text-blue-500 hover:underline">
                    (LinkedIn)
                </a>
            </p>


            <footer className="mt-16 text-center">
                <a href="/" className="text-blue-500 hover:underline">
                    Back to Home
                </a>
            </footer>
        </div>
    );
}
