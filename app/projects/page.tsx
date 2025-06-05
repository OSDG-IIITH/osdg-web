"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function ProjectsPage() {
    const [text, setText] = useState('');
    const fullText = "> PROJECTS MODULE INITIALIZATION...";
    const [showCursor, setShowCursor] = useState(true);

    // Typewriter effect
    useEffect(() => {
        if (text.length < fullText.length) {
            const timeout = setTimeout(() => {
                setText(fullText.slice(0, text.length + 1));
            }, 100);
            return () => clearTimeout(timeout);
        }
    }, [text]);

    // Blinking cursor effect
    useEffect(() => {
        const interval = setInterval(() => {
            setShowCursor(prev => !prev);
        }, 500);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-black text-green-500 font-mono p-4">
            <div className="w-full max-w-3xl">
                <header className="border border-green-500 p-4 mb-8">
                    <div className="flex justify-between items-center mb-2">
                        <h1 className="text-2xl">[PROJECTS]</h1>
                        <div className="text-sm">SYS.759.241</div>
                    </div>
                    <div className="h-px bg-green-500 w-full mb-2"></div>
                    <div className="flex justify-between text-xs">
                        <span>ACCESS: RESTRICTED</span>
                        <span>STATUS: LOADING</span>
                    </div>
                </header>

                <div className="border border-green-500 p-6 mb-8 min-h-[300px] relative overflow-hidden">
                    <div className="absolute top-0 left-0 p-2 bg-green-500 text-black text-xs">
                        TERMINAL OUTPUT
                    </div>

                    <div className="mt-6">
                        <p>{text}{showCursor ? '▋' : ' '}</p>

                        {text.length === fullText.length && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 1, duration: 0.8 }}
                                className="mt-8"                            >
                                <p>&gt; STATUS: DEVELOPMENT IN PROGRESS</p>
                                <p>&gt; ETA: CLASSIFIED</p>
                                <p className="mt-4">&gt; Projects database currently unavailable.</p>
                                <p>&gt; Access restricted to authorized personnel only.</p>
                                <p className="mt-8 text-xl">COMING SOON</p>

                                <div className="grid grid-cols-3 gap-4 mt-8">
                                    {[...Array(3)].map((_, i) => (
                                        <div key={i} className="border border-green-500 p-3 opacity-70">
                                            <div className="h-3 w-3/4 bg-green-500/30 mb-2"></div>
                                            <div className="h-2 w-1/2 bg-green-500/30 mb-1"></div>
                                            <div className="h-2 w-4/5 bg-green-500/30"></div>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </div>
                </div>

                <footer className="border border-green-500 p-4">
                    <div className="flex justify-between text-xs">
                        <span>CONNECTION SECURE</span>
                        <span className="animate-pulse">STANDBY FOR UPDATES...</span>
                    </div>
                </footer>
            </div>

            <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20">
                {[...Array(20)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute text-xs text-green-500"
                        style={{
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                            opacity: Math.random() * 0.5 + 0.5,
                        }}
                    >
                        {Math.random().toString(36).substring(2, 8)}
                    </div>
                ))}
            </div>
        </div>
    );
}
