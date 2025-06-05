'use client';

import { useState, useEffect, useRef } from 'react';

export default function Page() {
    const [terminalText, setTerminalText] = useState('');
    const [showCursor, setShowCursor] = useState(true);
    const [matrixChars, setMatrixChars] = useState([]);
    const [stats, setStats] = useState({ members: 0, projects: 0, commits: 0 });
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const welcomeMessage =
        "Welcome to OSDG_IIITH > Initializing hacker_mode... > Building tomorrow's open source";

    // Terminal typewriter effect
    useEffect(() => {
        let index = 0;
        const timer = setInterval(() => {
            if (index < welcomeMessage.length) {
                setTerminalText(welcomeMessage.slice(0, index + 1));
                index++;
            } else {
                clearInterval(timer);
            }
        }, 50);

        return () => clearInterval(timer);
    }, []);

    // Cursor blinking
    useEffect(() => {
        const cursorTimer = setInterval(() => {
            setShowCursor((prev) => !prev);
        }, 500);

        return () => clearInterval(cursorTimer);
    }, []);

    // Matrix rain effect
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*(){}[]<>/\\|';
        const fontSize = 14;
        const columns = canvas.width / fontSize;
        const drops = Array(Math.floor(columns)).fill(1);

        const draw = () => {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.fillStyle = '#00ff00';
            ctx.font = `${fontSize}px monospace`;

            for (let i = 0; i < drops.length; i++) {
                const text = chars[Math.floor(Math.random() * chars.length)];
                ctx.fillText(text, i * fontSize, drops[i] * fontSize);

                if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
        };

        const interval = setInterval(draw, 33);
        return () => clearInterval(interval);
    }, []);

    // Animated stats counter
    useEffect(() => {
        const animateStats = () => {
            const targets = { members: 150, projects: 42, commits: 2847 };
            const duration = 2000;
            const steps = 60;
            const increment = duration / steps;

            let step = 0;
            const timer = setInterval(() => {
                step++;
                const progress = step / steps;

                setStats({
                    members: Math.floor(targets.members * progress),
                    projects: Math.floor(targets.projects * progress),
                    commits: Math.floor(targets.commits * progress),
                });

                if (step >= steps) {
                    clearInterval(timer);
                    setStats(targets);
                }
            }, increment);
        };

        const timeout = setTimeout(animateStats, 1000);
        return () => clearTimeout(timeout);
    }, []);

    return (
        <div className="min-h-screen overflow-hidden relative">
            {/* Matrix Background */}
            <canvas
                ref={canvasRef}
                className="fixed inset-0 pointer-events-none opacity-20"
                style={{ zIndex: 1 }}
            />

            {/* Main Content */}
            <div className="relative z-10">
                {/* Hero Section */}
                <section className="min-h-screen flex items-center justify-center px-6">
                    <div className="max-w-6xl mx-auto text-center">
                        {/* ASCII Art Logo */}
                        <div className="mb-8 text-cyan-400 text-xs md:text-sm leading-tight">
                            <pre className="inline-block">
                                {`    ██████╗ ███████╗██████╗  ██████╗ 
   ██╔═══██╗██╔════╝██╔══██╗██╔════╝ 
   ██║   ██║███████╗██║  ██║██║  ███╗
   ██║   ██║╚════██║██║  ██║██║   ██║
   ╚██████╔╝███████║██████╔╝╚██████╔╝
    ╚═════╝ ╚══════╝╚═════╝  ╚═════╝`}
                            </pre>
                        </div>

                        {/* Terminal Welcome */}
                        <div className="mb-12 p-6 bg-black/50 border border-green-400/30 rounded-lg backdrop-blur-sm">
                            <div className="text-left">
                                <div className="text-green-400 mb-2">
                                    user@iiith:~$ ./welcome.sh
                                </div>
                                <div className="text-white">
                                    {terminalText}
                                    {showCursor && <span className="text-green-400">█</span>}
                                </div>
                            </div>
                        </div>

                        {/* Main Tagline */}
                        <h1 className="text-4xl md:text-7xl font-bold mb-6 text-white leading-tight">
                            Building Tomorrow&apos;s
                            <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-green-400 to-pink-400 animate-pulse">
                                Open Source
                            </span>
                        </h1>

                        <p className="text-xl md:text-2xl mb-12 text-green-300 max-w-3xl mx-auto">
                            Where passionate developers converge to create, collaborate, and
                            contribute to the future of technology.
                        </p>

                        {/* CTA Buttons */}
                        <div className="flex flex-col md:flex-row gap-6 justify-center mb-16">
                            <a
                                href="/game"
                                className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-green-500 text-black font-bold rounded-lg hover:scale-105 transform transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/50 flex items-center justify-center"
                            >
                                Enter the Matrix
                            </a>
                            <a
                                href="/team"
                                className="px-8 py-4 border-2 border-green-400 text-green-400 font-bold rounded-lg hover:bg-green-400 hover:text-black transition-all duration-300 hover:scale-105 flex items-center justify-center"
                            >
                                git clone community
                            </a>
                        </div>

                        {/* Live Stats */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                            {[
                                { label: 'Active Hackers', value: stats.members, suffix: '+' },
                                { label: 'Open Projects', value: stats.projects, suffix: '' },
                                { label: 'Total Commits', value: stats.commits, suffix: '+' },
                            ].map((stat, index) => (
                                <div
                                    key={index}
                                    className="p-6 bg-black/30 border border-green-400/30 rounded-lg backdrop-blur-sm hover:border-cyan-400/50 transition-all duration-300"
                                >
                                    <div className="text-3xl md:text-4xl font-bold text-cyan-400 mb-2">
                                        {stat.value.toLocaleString()}
                                        {stat.suffix}
                                    </div>
                                    <div className="text-green-300">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Quick Info Section */}
                <section className="py-20 px-6 border-t border-green-400/30">
                    <div className="max-w-6xl mx-auto">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                            <div className="space-y-6">
                                <h2 className="text-3xl font-bold text-cyan-400">
                                    {/* Mission Statement */}
                                </h2>
                                <div className="p-6 bg-black/50 border border-green-400/30 rounded-lg">
                                    <code className="text-green-300">
                                        <span className="text-pink-400">function</span>{' '}
                                        <span className="text-cyan-400">ourMission</span>
                                        () {'{'}
                                        <br />
                                        &nbsp;&nbsp;
                                        <span className="text-pink-400">return</span>{' '}
                                        <span className="text-yellow-400">
                                            &quot;Empowering students to contribute to open source, learn
                                            cutting-edge technologies, and build the future
                                            together.&quot;
                                        </span>
                                        ;
                                        <br />
                                        {'}'}
                                    </code>
                                </div>
                            </div>

                            <div className="space-y-6">
                                <h2 className="text-3xl font-bold text-cyan-400">
                                    {/* Latest Activity */}
                                </h2>
                                <div className="space-y-4">
                                    {[
                                        {
                                            user: 'dev_ninja',
                                            action: 'pushed to main',
                                            repo: 'quantum-compiler',
                                            time: '2m ago',
                                        },
                                        {
                                            user: 'code_wizard',
                                            action: 'opened PR #42',
                                            repo: 'ai-ethics-framework',
                                            time: '15m ago',
                                        },
                                        {
                                            user: 'byte_master',
                                            action: 'merged feature',
                                            repo: 'blockchain-voting',
                                            time: '1h ago',
                                        },
                                    ].map((activity, index) => (
                                        <div
                                            key={index}
                                            className="p-4 bg-black/30 border border-green-400/20 rounded-lg hover:border-cyan-400/50 transition-all duration-300"
                                        >
                                            <div className="flex justify-between items-center">
                                                <div>
                                                    <span className="text-cyan-400">
                                                        {activity.user}
                                                    </span>
                                                    <span className="text-green-300 mx-2">
                                                        {activity.action}
                                                    </span>
                                                    <span className="text-yellow-400">
                                                        {activity.repo}
                                                    </span>
                                                </div>
                                                <span className="text-gray-400 text-sm">
                                                    {activity.time}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Footer */}
                <footer className="py-12 px-6 border-t border-green-400/30">
                    <div className="max-w-6xl mx-auto text-center">
                        <div className="mb-6">
                            <code className="text-green-400">
                                console.log(&quot;Made with ❤️ by OSDG developers&quot;);
                            </code>
                        </div>
                        <div className="text-gray-400">
                            © 2024 Open Source Developers Club - IIIT Hyderabad
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    );
}
