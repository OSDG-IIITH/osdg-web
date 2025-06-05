'use client';

import { useState } from 'react';
import { Shuffle, User, Github, Code } from 'lucide-react';

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

interface RandomDeveloperGeneratorProps {
    members: Member[];
}

export function RandomDeveloperGenerator({ members }: RandomDeveloperGeneratorProps) {
    const [currentMember, setCurrentMember] = useState<Member | null>(null);
    const [isGenerating, setIsGenerating] = useState(false);
    const [animationPhase, setAnimationPhase] = useState(0);

    const generateRandomMember = () => {
        if (members.length === 0) return;

        setIsGenerating(true);
        setAnimationPhase(0);

        // Create a dramatic generation effect
        let phase = 0;
        const phases = ['SCANNING...', 'ANALYZING...', 'COMPILING...', 'COMPLETE!'];

        const phaseTimer = setInterval(() => {
            setAnimationPhase(phase);
            phase++;

            if (phase >= phases.length) {
                clearInterval(phaseTimer);

                // Select random member after animation
                setTimeout(() => {
                    const randomIndex = Math.floor(Math.random() * members.length);
                    setCurrentMember(members[randomIndex]);
                    setIsGenerating(false);
                }, 300);
            }
        }, 400);
    };

    const phases = ['SCANNING...', 'ANALYZING...', 'COMPILING...', 'COMPLETE!'];

    return (
        <div className="bg-black/60 border border-[#00ff00]/30 rounded-lg p-6 backdrop-blur-sm">
            <div className="flex items-center gap-2 mb-4">
                <Shuffle className="w-5 h-5 text-[#ff0080]" />
                <h3 className="font-mono text-[#ff0080] text-lg">RANDOM_DEV.EXE</h3>
            </div>

            {/* Terminal-style header */}
            <div className="bg-black/80 border border-[#00ff00]/20 rounded p-3 mb-4">
                <div className="font-mono text-xs text-[#00cc00]/70 space-y-1">
                    <div>$ ./discover_developer.sh</div>                    <div className="text-[#00d4ff]">{`> initiating random scan...`}</div>
                    {isGenerating && (
                        <div className="text-[#ff0080] animate-pulse">
                            {`> ${phases[animationPhase]}`}
                        </div>
                    )}
                </div>
            </div>

            {/* Generate button */}
            <button
                onClick={generateRandomMember}
                disabled={isGenerating}
                className={`w-full mb-6 px-4 py-3 rounded font-mono text-sm transition-all ${isGenerating
                        ? 'bg-[#ff0080]/20 border border-[#ff0080]/50 text-[#ff0080] cursor-not-allowed'
                        : 'bg-[#00ff00]/10 hover:bg-[#00ff00]/20 border border-[#00ff00]/30 text-[#00ff00] hover:scale-105'
                    }`}
            >
                {isGenerating ? (
                    <div className="flex items-center justify-center gap-2">
                        <div className="w-4 h-4 border-2 border-[#ff0080] border-t-transparent rounded-full animate-spin"></div>
                        GENERATING...
                    </div>
                ) : (
                    <div className="flex items-center justify-center gap-2">
                        <Shuffle className="w-4 h-4" />
                        DISCOVER RANDOM DEVELOPER
                    </div>
                )}
            </button>

            {/* Generated member display */}
            {currentMember && !isGenerating && (
                <div className="space-y-4 animate-fadeIn">
                    {/* Member card */}
                    <div className="bg-black/60 border border-[#00d4ff]/20 rounded p-4">
                        <div className="flex items-start gap-3 mb-3">
                            <div className="w-12 h-12 rounded-full bg-[#00d4ff]/20 border border-[#00d4ff]/50 flex items-center justify-center">
                                <User className="w-6 h-6 text-[#00d4ff]" />
                            </div>
                            <div className="flex-1">
                                <h4 className="font-mono text-[#00ff00] font-bold">
                                    {currentMember.name}
                                </h4>
                                <p className="text-[#00d4ff] text-sm font-mono">
                                    {currentMember.role}
                                </p>
                                <p className="text-[#00cc00]/80 text-xs font-mono mt-1">
                                    {currentMember.bio}
                                </p>
                            </div>
                        </div>

                        {/* Quick stats */}
                        <div className="grid grid-cols-3 gap-2 mb-3">
                            <div className="text-center p-2 bg-black/60 rounded border border-[#00ff00]/20">
                                <div className="text-[#00ff00] font-mono text-sm font-bold">
                                    {currentMember.githubStats.commits}
                                </div>
                                <div className="text-[#00cc00]/60 text-xs font-mono">commits</div>
                            </div>
                            <div className="text-center p-2 bg-black/60 rounded border border-[#00d4ff]/20">
                                <div className="text-[#00d4ff] font-mono text-sm font-bold">
                                    {currentMember.githubStats.prs}
                                </div>
                                <div className="text-[#00cc00]/60 text-xs font-mono">PRs</div>
                            </div>
                            <div className="text-center p-2 bg-black/60 rounded border border-[#ff0080]/20">
                                <div className="text-[#ff0080] font-mono text-sm font-bold">
                                    {currentMember.githubStats.issues}
                                </div>
                                <div className="text-[#00cc00]/60 text-xs font-mono">issues</div>
                            </div>
                        </div>

                        {/* Top tech */}
                        <div className="mb-3">
                            <div className="text-[#00d4ff] text-xs font-mono mb-1">
                                $ echo $PRIMARY_TECH
                            </div>
                            <div className="flex flex-wrap gap-1">
                                {currentMember.techStack.slice(0, 3).map((tech, i) => (
                                    <span
                                        key={i}
                                        className="bg-[#00ff00]/10 text-[#00ff00] px-2 py-1 rounded-sm text-xs font-mono border border-[#00ff00]/30"
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Fun fact */}
                        <div className="mb-4">
                            <div className="text-[#ff0080] text-xs font-mono mb-1">
                                # Random fact:
                            </div>
                            <div className="text-[#00cc00]/80 text-xs font-mono">
                                {currentMember.funFact}
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-2">
                            <a
                                href={`https://github.com/${currentMember.github}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex-1 flex items-center justify-center gap-2 bg-[#00d4ff]/10 hover:bg-[#00d4ff]/20 border border-[#00d4ff]/30 text-[#00d4ff] px-3 py-2 rounded text-xs font-mono transition-all"
                            >
                                <Github className="w-3 h-3" />
                                VIEW PROFILE
                            </a>
                            <button
                                onClick={() => setCurrentMember(null)}
                                className="flex items-center justify-center gap-2 bg-[#ff3333]/10 hover:bg-[#ff3333]/20 border border-[#ff3333]/30 text-[#ff3333] px-3 py-2 rounded text-xs font-mono transition-all"
                            >
                                ✕
                            </button>
                        </div>
                    </div>

                    {/* Terminal output */}
                    <div className="bg-black/80 border border-[#00ff00]/20 rounded p-3">
                        <div className="font-mono text-xs text-[#00cc00]/70 space-y-1">
                            <div>$ cat /dev/urandom | grep developer</div>                            <div className="text-[#00ff00]">
                                {`> found: ${currentMember.name.toLowerCase().replace(' ', '_')}`}
                            </div>
                            <div className="text-[#00d4ff]">
                                {`> role: ${currentMember.role.toLowerCase()}`}
                            </div>
                            <div className="text-[#ff0080]">
                                {`> skill_level: expert`}
                            </div>
                            <div className="text-[#00cc00]">
                                {`> status: active_contributor`}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Empty state */}
            {!currentMember && !isGenerating && (
                <div className="text-center py-8">
                    <Code className="w-12 h-12 text-[#00cc00]/30 mx-auto mb-4" />
                    <div className="font-mono text-sm text-[#00cc00]/50">
                        Click the button above to discover a random developer from our collective
                    </div>
                </div>
            )}
        </div>
    );
}