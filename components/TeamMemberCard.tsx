'use client';

import { useState } from 'react';
import { Github, Code, Database, Zap } from 'lucide-react';

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

interface TeamMemberCardProps {
    member: Member;
    index: number;
}

export function TeamMemberCard({ member, index }: TeamMemberCardProps) {
    const [isHovered, setIsHovered] = useState(false);
    const [showTerminal, setShowTerminal] = useState(false);

    // Generate contribution heatmap
    const generateHeatmap = () => {
        const weeks = [];
        for (let i = 0; i < 52; i++) {
            const level = member.contributions[i] || 0;
            const intensity = level === 0 ? 0 : Math.min(4, Math.floor(level / 2) + 1);
            weeks.push(intensity);
        }
        return weeks;
    };

    const heatmapData = generateHeatmap();

    return (
        <div
            className="group relative"
            style={{ animationDelay: `${index * 100}ms` }}
        >
            {/* Hexagonal container */}
            <div
                className="hexagon-card relative overflow-hidden transition-all duration-500 hover:scale-105"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onClick={() => setShowTerminal(!showTerminal)}
            >
                {/* Background contribution heatmap */}
                <div className="absolute inset-0 opacity-10">
                    <div className="grid grid-cols-52 gap-px p-4">
                        {heatmapData.map((level, i) => (
                            <div
                                key={i}
                                className={`w-1 h-1 rounded-sm ${level === 0 ? 'bg-gray-800' :
                                        level === 1 ? 'bg-[#00ff00]/20' :
                                            level === 2 ? 'bg-[#00ff00]/40' :
                                                level === 3 ? 'bg-[#00ff00]/60' :
                                                    'bg-[#00ff00]/80'
                                    }`}
                            />
                        ))}
                    </div>
                </div>

                {/* Main card content */}
                <div className="relative z-10 p-6 bg-black/80 border border-[#00ff00]/30 rounded-lg backdrop-blur-sm h-full">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                            <div className="relative">
                                <div className="w-12 h-12 rounded-full bg-[#00ff00]/20 border border-[#00ff00]/50 flex items-center justify-center">
                                    <Code className="w-6 h-6 text-[#00ff00]" />
                                </div>
                                <div className="absolute -top-1 -right-1 w-4 h-4 bg-[#00d4ff] rounded-full border-2 border-black animate-pulse"></div>
                            </div>
                            <div>
                                <h3 className="font-mono text-[#00ff00] font-bold">{member.name}</h3>
                                <p className="text-[#00d4ff] text-sm font-mono">{member.role}</p>
                            </div>
                        </div>
                        <span className="text-xs font-mono text-[#00cc00]/60 bg-[#00ff00]/10 px-2 py-1 rounded">
                            {member.year}
                        </span>
                    </div>

                    {/* Bio */}
                    <p className="text-[#00cc00]/80 text-sm mb-4 font-mono leading-relaxed">
                        {member.bio}
                    </p>

                    {/* GitHub Stats */}
                    <div className="grid grid-cols-3 gap-2 mb-4">
                        <div className="text-center p-2 bg-black/60 rounded border border-[#00ff00]/20">
                            <div className="text-[#00ff00] font-mono text-lg font-bold">
                                {member.githubStats.commits}
                            </div>
                            <div className="text-[#00cc00]/60 text-xs font-mono">commits</div>
                        </div>
                        <div className="text-center p-2 bg-black/60 rounded border border-[#00d4ff]/20">
                            <div className="text-[#00d4ff] font-mono text-lg font-bold">
                                {member.githubStats.prs}
                            </div>
                            <div className="text-[#00cc00]/60 text-xs font-mono">PRs</div>
                        </div>
                        <div className="text-center p-2 bg-black/60 rounded border border-[#ff0080]/20">
                            <div className="text-[#ff0080] font-mono text-lg font-bold">
                                {member.githubStats.issues}
                            </div>
                            <div className="text-[#00cc00]/60 text-xs font-mono">issues</div>
                        </div>
                    </div>

                    {/* Tech Stack */}
                    <div className="mb-4">
                        <div className="text-[#00d4ff] text-xs font-mono mb-2">$ tech_stack --list</div>
                        <div className="flex flex-wrap gap-1">
                            {member.techStack.map((tech, i) => (
                                <span
                                    key={i}
                                    className="bg-[#00ff00]/10 text-[#00ff00] px-2 py-1 rounded-sm text-xs font-mono border border-[#00ff00]/30"
                                >
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Fun Fact */}
                    <div className="text-[#ff0080] text-xs font-mono mb-4">
                        <span className="text-[#00d4ff]"># Fun fact:</span> {member.funFact}
                    </div>

                    {/* GitHub Link */}
                    <div className="flex items-center justify-between">
                        <a
                            href={`https://github.com/${member.github}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-[#00d4ff] hover:text-[#00ff00] transition-colors font-mono text-sm"
                        >
                            <Github className="w-4 h-4" />
                            @{member.github}
                        </a>
                        <button className="text-[#00ff00] hover:text-[#00d4ff] transition-colors">
                            <Database className="w-4 h-4" />
                        </button>
                    </div>
                </div>

                {/* Hover effects */}
                <div className={`absolute inset-0 border-2 border-[#00ff00] rounded-lg transition-all duration-300 ${isHovered ? 'opacity-100 scale-105' : 'opacity-0 scale-100'
                    }`} />

                {/* Glitch effect overlay */}
                <div className={`absolute inset-0 bg-[#00ff00] mix-blend-multiply transition-all duration-100 ${isHovered ? 'opacity-5' : 'opacity-0'
                    }`} />
            </div>

            {/* Terminal Window Overlay */}
            {showTerminal && (
                <div className="absolute inset-0 z-50 bg-black/95 border border-[#00ff00] rounded-lg p-4 font-mono text-sm">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-[#ff3333]"></div>
                            <div className="w-3 h-3 rounded-full bg-[#ffff00]"></div>
                            <div className="w-3 h-3 rounded-full bg-[#00ff00]"></div>
                        </div>
                        <button
                            onClick={() => setShowTerminal(false)}
                            className="text-[#ff3333] hover:text-[#ff0080] transition-colors"
                        >
                            ✕
                        </button>
                    </div>

                    <div className="text-[#00ff00] space-y-2">
                        <div>$ whoami</div>
                        <div className="text-[#00d4ff]">{member.name.toLowerCase().replace(' ', '_')}</div>

                        <div>$ cat /dev/role</div>
                        <div className="text-[#00d4ff]">{member.role}</div>

                        <div>$ git log --oneline | head -3</div>
                        <div className="text-[#00cc00]/80 text-xs">
                            <div>a7b3c2d Fix critical bug in authentication</div>
                            <div>f9e8d1a Add new feature: real-time collaboration</div>
                            <div>c3b2a1f Optimize database queries for performance</div>
                        </div>

                        <div>$ echo $FUN_FACT</div>
                        <div className="text-[#ff0080]">{member.funFact}</div>

                        <div className="text-[#00ff00] animate-pulse">_</div>
                    </div>
                </div>
            )}
        </div>
    );
}