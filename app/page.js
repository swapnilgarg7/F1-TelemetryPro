import Image from "next/image";

export default function Home() {
  return (
    <div className="bg-gray-900 grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <Image
          src="/F1TPLogo.png"
          alt="F1 Dashboard Logo"
          width={150}
          height={10}
          priority
        />
        <h1 className="text-2xl font-bold">Welcome to F1-TelemetryPro</h1>
        <p className="text-center sm:text-left text-sm">
          Analyze real-time F1 telemetry data
        </p>
        <ol className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
          <li className="mb-2">
            Start by selecting a race or car telemetry data
          </li>
          <li>Checkout the Race Calendar</li>
        </ol>

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <a
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
            href="/telemetry"
          >
            View Telemetry
          </a>
          <a
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
            href="/calendar"
          >
            Race Calendar
          </a>
        </div>
      </main>
      <footer className="row-start-3 flex gap-12 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="/about"
        >
          About
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://github.com/swapnilgarg7/F1-TelemetryPro"
          target="_blank"
        >
          Github
        </a>
      </footer>
    </div>
  );
}
