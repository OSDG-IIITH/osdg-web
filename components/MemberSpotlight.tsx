'use client';

import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';

interface Member {
    id: number;
    name: string;
    role: string;
    year: string;
    avatar: string;
    githubStats: { commits: number; prs: number; issues: number };
    techStack: string[];
    funFact: string;
    bio: string;
    github: string;
    contributions: number[];
}

interface MemberSpotlightProps {
    members: Member[];
}

// Extended interview data for spotlight
const interviewSnippets = [
    {
        question: "What's your favorite piece of code you've written?",
        answer: "A recursive algorithm that solved a complex graph traversal problem in just 15 lines. It was elegant and efficient.",
    },
    {
        question: "How did you get into programming?",
        answer: "Started with HTML when I was 12, building websites for my favorite games. The rest is history!",
    },
    {
        question: "What's your dream project?",
        answer: "Building an AI that can automatically refactor legacy codebases while maintaining 100% functionality.",
    },
    {
        question: "Best debugging story?",
        answer: "Spent 6 hours debugging a critical issue. Turned out to be a missing semicolon. Now I use strict linting!",
    },
    {
        question: "Advice for new developers?",
        answer: "Don't be afraid to break things. Every bug is a learning opportunity. And always read the documentation.",
    },
];

export function MemberSpotlight({ members }: MemberSpotlightProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(true);
    const [typewriterText, setTypewriterText] = useState('');
    const [showCursor, setShowCursor] = useState(true);

    const currentMember = members[currentIndex];
    const currentInterview = interviewSnippets[currentIndex % interviewSnippets.length];

    // Auto-rotate spotlight
    useEffect(() => {
        if (!isPlaying) return;

        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % members.length);
        }, 5000);

        return () => clearInterval(timer);
    }, [isPlaying, members.length]);

    // Typewriter effect for interview
    useEffect(() => {
        setTypewriterText('');
        let index = 0;
        const fullText = currentInterview.answer;

        const timer = setInterval(() => {
            if (index <= fullText.length) {
                setTypewriterText(fullText.slice(0, index));
                index++;
            } else {
                clearInterval(timer);
            }
        }, 30);

        return () => clearInterval(timer);
    }, [currentIndex, currentInterview.answer]);

    // Cursor blinking
    useEffect(() => {
        const cursorTimer = setInterval(() => {
            setShowCursor(prev => !prev);
        }, 500);
        return () => clearInterval(cursorTimer);
    }, []);

    const nextMember = () => {
        setCurrentIndex((prev) => (prev + 1) % members.length);
    };

    const prevMember = () => {
        setCurrentIndex((prev) => (prev - 1 + members.length) % members.length);
    };

    if (!currentMember) return null;

    return (
        <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-mono text-[#00ff00] glitch-text">
                    &gt; MEMBER_SPOTLIGHT.LIVE
                </h2>
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => setIsPlaying(!isPlaying)}
                        className="flex items-center gap-2 text-[#00d4ff] hover:text-[#00ff00] transition-colors font-mono text-sm"
                    >
                        {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                        {isPlaying ? 'PAUSE' : 'RESUME'}
                    </button>
                    <div className="text-sm font-mono text-[#00cc00]/70">
                        {currentIndex + 1} / {members.length}
                    </div>
                </div>
            </div>

            <div className="bg-black/60 border border-[#00ff00]/30 rounded-lg overflow-hidden backdrop-blur-sm">
                {/* Terminal header */}
                <div className="bg-black/80 border-b border-[#00ff00]/20 p-4">
                    <div className="flex items-center gap-2 mb-2">
                        <div className="w-3 h-3 rounded-full bg-[#ff3333]"></div>
                        <div className="w-3 h-3 rounded-full bg-[#ffff00]"></div>
                        <div className="w-3 h-3 rounded-full bg-[#00ff00]"></div>
                        <span className="ml-4 font-mono text-sm text-[#00cc00]">
                            interview_session.sh
                        </span>
                    </div>
                    <div className="font-mono text-xs text-[#00cc00]/70">
                        $ ssh {currentMember.github}@osdg.iiith.ac.in
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
                    {/* Member info */}
                    <div className="space-y-6">
                        <div className="flex items-start gap-4">
                            <div className="relative">
                                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#00ff00]/20 to-[#00d4ff]/20 border-2 border-[#00ff00]/50 flex items-center justify-center">
                                    <div className="w-16 h-16 rounded-full bg-[#00ff00]/10 flex items-center justify-center">
                                        <span className="text-2xl font-mono text-[#00ff00]">
                                            {currentMember.name.split(' ').map(n => n[0]).join('')}
                                        </span>
                                    </div>
                                </div>
                                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-[#00ff00] rounded-full border-2 border-black flex items-center justify-center">
                                    <div className="w-2 h-2 bg-black rounded-full animate-pulse"></div>
                                </div>
                            </div>

                            <div className="flex-1">
                                <h3 className="text-xl font-mono text-[#00ff00] font-bold mb-1">
                                    {currentMember.name}
                                </h3>
                                <p className="text-[#00d4ff] font-mono mb-2">{currentMember.role}</p>
                                <p className="text-[#00cc00]/80 text-sm font-mono leading-relaxed">
                                    {currentMember.bio}
                                </p>
                            </div>
                        </div>

                        {/* Quick stats */}
                        <div className="grid grid-cols-3 gap-3">
                            <div className="bg-black/60 border border-[#00ff00]/20 rounded p-3 text-center">
                                <div className="text-[#00ff00] font-mono text-lg font-bold">
                                    {currentMember.githubStats.commits}
                                </div>
                                <div className="text-[#00cc00]/60 text-xs font-mono">commits</div>
                            </div>
                            <div className="bg-black/60 border border-[#00d4ff]/20 rounded p-3 text-center">
                                <div className="text-[#00d4ff] font-mono text-lg font-bold">
                                    {currentMember.githubStats.prs}
                                </div>
                                <div className="text-[#00cc00]/60 text-xs font-mono">PRs</div>
                            </div>
                            <div className="bg-black/60 border border-[#ff0080]/20 rounded p-3 text-center">
                                <div className="text-[#ff0080] font-mono text-lg font-bold">
                                    {currentMember.githubStats.issues}
                                </div>
                                <div className="text-[#00cc00]/60 text-xs font-mono">issues</div>
                            </div>
                        </div>

                        {/* Tech stack */}
                        <div>
                            <div className="text-[#00d4ff] font-mono text-sm mb-2">$ grep -r &quot;expertise&quot; ~/.profile</div>
                            <div className="flex flex-wrap gap-2">
                                {currentMember.techStack.map((tech, i) => (
                                    <span
                                        key={i}
                                        className="bg-[#00ff00]/10 text-[#00ff00] px-3 py-1 rounded text-sm font-mono border border-[#00ff00]/30"
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Interview section */}
                    <div className="space-y-4">
                        <div className="bg-black/60 border border-[#00d4ff]/20 rounded p-4">
                            <div className="font-mono text-sm text-[#00d4ff] mb-3">
                                interviewer@osdg:~$ ask_question
                            </div>
                            <div className="text-[#00ff00] font-mono text-sm mb-4">
                                &gt; {currentInterview.question}
                            </div>
                            <div className="text-[#00cc00] font-mono text-sm leading-relaxed min-h-[60px]">
                                {typewriterText}
                                <span className={`${showCursor ? 'opacity-100' : 'opacity-0'} transition-opacity text-[#00ff00]`}>
                                    _
                                </span>
                            </div>
                        </div>

                        <div className="bg-black/60 border border-[#ff0080]/20 rounded p-4">
                            <div className="font-mono text-sm text-[#ff0080] mb-2">
                                # Random fact generator
                            </div>
                            <div className="text-[#00cc00] font-mono text-sm">
                                {currentMember.funFact}
                            </div>
                        </div>

                        {/* Navigation controls */}
                        <div className="flex items-center justify-between">
                            <button
                                onClick={prevMember}
                                className="flex items-center gap-2 bg-[#00ff00]/10 hover:bg-[#00ff00]/20 border border-[#00ff00]/30 text-[#00ff00] px-4 py-2 rounded font-mono text-sm transition-all"
                            >
                                <ChevronLeft className="w-4 h-4" />
                                PREV
                            </button>

                            <div className="flex gap-2">
                                {members.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setCurrentIndex(index)}
                                        className={`w-2 h-2 rounded-full transition-all ${index === currentIndex
                                            ? 'bg-[#00ff00] scale-125'
                                            : 'bg-[#00ff00]/30 hover:bg-[#00ff00]/50'
                                            }`}
                                    />
                                ))}
                            </div>

                            <button
                                onClick={nextMember}
                                className="flex items-center gap-2 bg-[#00ff00]/10 hover:bg-[#00ff00]/20 border border-[#00ff00]/30 text-[#00ff00] px-4 py-2 rounded font-mono text-sm transition-all"
                            >
                                NEXT
                                <ChevronRight className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}