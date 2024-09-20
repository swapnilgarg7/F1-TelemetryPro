"use client";

import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";

export default function Home() {
  const logoRef = useRef(null);
  const titleRef = useRef(null);
  const descRef = useRef(null);
  const listRef = useRef(null);
  const buttonsRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // Set initial states
      gsap.set([logoRef.current, titleRef.current, descRef.current, listRef.current.children, buttonsRef.current.children], { opacity: 0 });

      // Animate logo
      tl.to(logoRef.current, { y: 0, opacity: 1, duration: 1, ease: "back.out(1.7)" });

      // Animate title and description
      tl.to([titleRef.current, descRef.current], {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out"
      }, "-=0.5");

      // Animate list items
      tl.to(listRef.current.children, {
        x: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out"
      }, "-=0.3");

      // Animate buttons
      tl.to(buttonsRef.current.children, {
        scale: 1,
        opacity: 1,
        duration: 0.5,
        stagger: 0.1,
        ease: "back.out(1.7)"
      }, "-=0.2");
    });

    return () => ctx.revert(); // Cleanup animation context
  }, []);

  return (
    <div className="bg-gray-900 grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] overflow-hidden">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start relative z-10">
        <div ref={logoRef}>
          <Image
            src="/F1TPLogo.png"
            alt="F1 Dashboard Logo"
            width={150}
            height={10}
            priority
          />
        </div>
        <h1 ref={titleRef} className="text-2xl font-bold text-white">Welcome to F1-TelemetryPro</h1>
        <p ref={descRef} className="text-center sm:text-left text-sm text-gray-300">
          Analyze real-time F1 telemetry data
        </p>
        <ol ref={listRef} className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)] text-gray-400">
          <li className="mb-2">
            Start by selecting a race or car telemetry data
          </li>
          <li>Checkout the Race Calendar</li>
        </ol>

        <div ref={buttonsRef} className="flex gap-4 items-center flex-col sm:flex-row">
          <a
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-red-600 text-white gap-2 hover:bg-red-700 text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
            href="/telemetry"
          >
            View Telemetry
          </a>
          <a
            className="rounded-full border border-solid border-white/[.145] transition-colors flex items-center justify-center hover:bg-gray-800 text-white hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
            href="/calendar"
          >
            Race Calendar
          </a>
        </div>
      </main>

      <footer className="row-start-3 flex gap-12 flex-wrap items-center justify-center text-gray-400">
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
          rel="noopener noreferrer"
        >
          Github
        </a>
      </footer>
    </div>
  );
}