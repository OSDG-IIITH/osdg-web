"use client";

import React, { useEffect, useState, useRef } from "react";

export default function HomePage() {
  const [scrollY, setScrollY] = useState(0);
  const [typedCommand, setTypedCommand] = useState("");
  const [showAbout, setShowAbout] = useState(false);
  const [consoleVisible, setConsoleVisible] = useState(false);
  const [typedLines, setTypedLines] = useState<string[]>([]);
  const [activeLine, setActiveLine] = useState(-1);
  const [hasAnimated, setHasAnimated] = useState(false);
  const command = "osdg@iiith:~$ sudo man osdg";
  const aboutRef = useRef<HTMLDivElement>(null);

  const aboutLines = [
    "",
    "NAME",
    "    OSDG - Open Source Developers Group, IIIT Hyderabad",
    "-------------------------------------------------------------------",
    "",
    "DESCRIPTION",
    "    The Open Source Developers Group (OSDG) at IIIT Hyderabad is the premier student-run organization for mastering open-source development.",
    " ",
    
    "    As a distinguished arm of the Center for Open Source, IIIT-H, OSDG empowers passionate contributors to grow into confident, visionary tech leaders.",
    " ",
    
    "    Through competitive programs like Google Summer of Code, impactful projects, and dynamic events, we set the benchmark for open-source excellence.",
    "-------------------------------------------------------------------"
  ];

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!aboutRef.current || hasAnimated) return;

    // Use a higher threshold to delay animation until more of the section is visible
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Only trigger when the element is more visible (higher threshold)
          if (entry.isIntersecting && !hasAnimated) {
            setConsoleVisible(true);
            setHasAnimated(true);
            let i = 0;
            const interval = setInterval(() => {
              setTypedCommand(command.slice(0, i + 1));
              i++;
              if (i === command.length) {
                clearInterval(interval);
                setTimeout(() => {
                  // Start typing lines one by one
                  let lineIndex = 0;
                  const lineInterval = setInterval(() => {
                    setTypedLines((prev) => [...prev, aboutLines[lineIndex]]);
                    setActiveLine(lineIndex);
                    lineIndex++;
                    if (lineIndex === aboutLines.length) {
                      clearInterval(lineInterval);
                      setShowAbout(true);
                      setActiveLine(-1);
                    }
                  }, 600);
                }, 600);
              }
            }, 100);
          }
        });
      },
      { threshold: 0.5 } // Increased threshold to delay animation start
    );

    observer.observe(aboutRef.current);
    return () => observer.disconnect();
  }, [hasAnimated]);

  // Improved transition factor using cubic ease function for smoother transition
  const rawFactor = Math.min(scrollY / (window.innerHeight * 0.6), 1);

  // Apply easing function for smoother transition
  const factor = easeInOutCubic(rawFactor);

  // Easing function for smoother transitions
  function easeInOutCubic(x: number): number {
    return x < 0.5
      ? 4 * x * x * x
      : 1 - Math.pow(-2 * x + 2, 3) / 2;
  }

  const fullForm = "Open Source Developers Group".split(" ");
  const acronym = "OSDG".split("");

  // Improved interpolated morph with smoother transitions
  const transitionTitle = fullForm
    .map((word, idx) => {
      // Calculate individual transition points for each word to stagger the effect
      const individualThreshold = idx / fullForm.length;
      const individualFactor = Math.max(
        0,
        (factor - individualThreshold) * fullForm.length
      );

      // Fade between word and acronym letter
      if (individualFactor >= 1) {
        return acronym[idx] || "";
      } else if (individualFactor > 0) {
        // For partial transitions, create a mixed representation
        const letterProgress = individualFactor % 1;
        return letterProgress > 0.5 ? acronym[idx] || "" : word;
      }
      return word;
    })
    .join(" ");

  const isFinalAcronym = factor >= 1;

  // Format the words to have larger first letters
  const formatText = (text: string) => {
    return text.split(" ").map((word) => {
      if (word.length === 0) return word;
      return (
        <span key={word} className="inline-block">
          <span className="text-125percent">{word.charAt(0)}</span>
          {word.substring(1)}
          &nbsp;
        </span>
      );
    });
  };

  return (
    <div className="min-h-screen bg-black bg-gradient-to-b from-black to-blue-900/30 text-white font-sans scroll-smooth">
      {/* Hero Section */}
      <section className="flex flex-col justify-center items-center min-h-screen text-center relative overflow-hidden px-4">
        <div className="flex flex-col items-center justify-center">
        <style jsx global>{`
          .text-125percent {
            font-size: 125%;
          }
        `}</style>

        <h1
          className={`font-bold transition-all duration-500 ease-in-out font-oxanium mx-auto text-center max-w-5xl leading-tight ${
            isFinalAcronym ? "text-7xl tracking-widest" : ""
          }`}
          style={{
            fontSize: isFinalAcronym
              ? "5rem"
              : `${3 + (1 - factor) * 3}rem`,
            letterSpacing: isFinalAcronym ? "0.5rem" : `${factor * 0.3}rem`,
            lineHeight: isFinalAcronym ? "1.1" : "0.9",
          }}
        >
          {isFinalAcronym ? (
            acronym.map((letter, idx) => (
              <span key={idx} className={idx === 0 ? "text-125percent" : ""}>
                {letter}
              </span>
            ))
          ) : (
            formatText(transitionTitle)
          )}
        </h1>

        {!isFinalAcronym && factor < 0.3 && (
          <p className="mt-6 text-lg md:text-xl text-gray-400 max-w-2xl transition-opacity duration-300">
            Where elite minds meet open source — to build, disrupt, and lead the future - openly.
          </p>
        )}
        </div>
      </section>

      {/* About Section - Moved slightly higher in the layout */}
      <section
        id="about"
        ref={aboutRef}
        className="flex justify-center items-center min-h-[90vh] py-20 text-green-400 font-mono p-6"
      >
        <div
          className={`max-w-3xl w-full bg-[#000000] rounded-2xl shadow-lg p-6 transform transition-all duration-700 ease-out ${
            consoleVisible ? "scale-100 opacity-100" : "scale-75 opacity-0"
          }`}
        >
          {/* Command Line */}
          <p className="text-lg">
            {typedCommand}
            {!showAbout && <span className="animate-pulse">|</span>}
          </p>

          {/* Fake sudo password prompt */}
          {typedCommand === command && !showAbout && (
            <p className="mt-2">[sudo] password for osdg: ••••••••</p>
          )}

          {/* Output like a man page typed line by line */}
          {typedLines.length > 0 && (
            <div className="mt-6 whitespace-pre-line text-gray-200">
              {typedLines.map((line, idx) => {
                const safeLine = line || "";
                const isKnownHeader = safeLine.trim() === "NAME" || safeLine.trim() === "DESCRIPTION";
                const isSectionHeader = 
                  (safeLine.trim() !== "" && safeLine === safeLine.toUpperCase()) || isKnownHeader;
                const isSeparator = /^[-]+$/.test(safeLine.trim());

                let lineClass = "ml-4 mt-2 text-gray-200"; // default normal text

                if (safeLine.trim() === "") {
                  lineClass = "my-6"; // blank line with bigger vertical spacing
                } else if (isSectionHeader) {
                  lineClass = "font-bold mt-4 text-cyan-400 uppercase";
                } else if (isSeparator) {
                  lineClass = "mt-2 text-gray-500";
                }

                return (
                  <p key={idx} className={lineClass}>
                    {safeLine}
                    {idx === activeLine && <span className="animate-pulse">|</span>}
                  </p>
                );
              })}

            </div>
          )}
        </div>
      </section>
    </div>
  );
}
