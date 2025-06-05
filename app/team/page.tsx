'use client';

import { useState, useEffect } from 'react';
import { FilterPanel } from '@/components/FilterPanel';
import { TeamMemberCard } from '@/components/TeamMemberCard';
import { NetworkVisualization } from '@/components/NetworkVisualization';
import { MemberSpotlight } from '@/components/MemberSpotlight';
import { RandomDeveloperGenerator } from '@/components/RandomDeveloperGenerator';

// Mock data for team members
const mockMembers = [
    {
        id: 1,
        name: "Alex Chen",
        role: "Lead Developer",
        year: "2024",
        avatar: "/api/placeholder/150/150",
        githubStats: { commits: 1247, prs: 89, issues: 156 },
        techStack: ["React", "Node.js", "Python", "Docker"],
        funFact: "Can code in 12 programming languages",
        bio: "Full-stack wizard with a passion for clean code and coffee.",
        github: "alexchen",
        contributions: Array.from({ length: 52 }, () => Math.floor(Math.random() * 10))
    },
    {
        id: 2,
        name: "Sarah Kumar",
        role: "ML Engineer",
        year: "2023",
        avatar: "/api/placeholder/150/150",
        githubStats: { commits: 892, prs: 67, issues: 134 },
        techStack: ["Python", "TensorFlow", "PyTorch", "Kubernetes"],
        funFact: "Trained a model to predict the best coffee brewing time",
        bio: "AI enthusiast turning data into digital magic.",
        github: "sarahkumar",
        contributions: Array.from({ length: 52 }, () => Math.floor(Math.random() * 8))
    },
    {
        id: 3,
        name: "Marcus Rodriguez",
        role: "DevOps Lead",
        year: "2024",
        avatar: "/api/placeholder/150/150",
        githubStats: { commits: 2156, prs: 123, issues: 89 },
        techStack: ["AWS", "Terraform", "Go", "Jenkins"],
        funFact: "Automated his entire morning routine",
        bio: "Infrastructure ninja making deployments seamless.",
        github: "marcusrodriguez",
        contributions: Array.from({ length: 52 }, () => Math.floor(Math.random() * 12))
    },
    {
        id: 4,
        name: "Priya Singh",
        role: "Frontend Architect",
        year: "2023",
        avatar: "/api/placeholder/150/150",
        githubStats: { commits: 1543, prs: 201, issues: 67 },
        techStack: ["Vue.js", "TypeScript", "GSAP", "Three.js"],
        funFact: "Creates animations smoother than butter",
        bio: "UI/UX perfectionist crafting pixel-perfect experiences.",
        github: "priyasingh",
        contributions: Array.from({ length: 52 }, () => Math.floor(Math.random() * 9))
    },
    {
        id: 5,
        name: "David Kim",
        role: "Backend Engineer",
        year: "2024",
        avatar: "/api/placeholder/150/150",
        githubStats: { commits: 987, prs: 78, issues: 112 },
        techStack: ["Rust", "PostgreSQL", "Redis", "GraphQL"],
        funFact: "Optimized a query by 10000% (true story)",
        bio: "Performance obsessed backend architect.",
        github: "davidkim",
        contributions: Array.from({ length: 52 }, () => Math.floor(Math.random() * 7))
    },
    {
        id: 6,
        name: "Lisa Zhang",
        role: "Security Engineer",
        year: "2023",
        avatar: "/api/placeholder/150/150",
        githubStats: { commits: 743, prs: 45, issues: 201 },
        techStack: ["Golang", "Kubernetes", "Vault", "Wireshark"],
        funFact: "Found 23 vulnerabilities in popular OSS projects",
        bio: "Digital security guardian protecting the codebase.",
        github: "lisazhang",
        contributions: Array.from({ length: 52 }, () => Math.floor(Math.random() * 6))
    }
];

export default function Page() {
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredMembers, setFilteredMembers] = useState(mockMembers);
    const [filters, setFilters] = useState({
        year: 'all',
        role: 'all',
        techStack: 'all'
    });
    const [terminalText, setTerminalText] = useState('');
    const [showCursor, setShowCursor] = useState(true);

    const headerMessage = "ACCESSING OSDG_DATABASE > LOADING COLLECTIVE_MEMBERS > WELCOME TO THE MATRIX";

    // Terminal typewriter effect
    useEffect(() => {
        let index = 0;
        const timer = setInterval(() => {
            if (index < headerMessage.length) {
                setTerminalText(headerMessage.slice(0, index + 1));
                index++;
            } else {
                clearInterval(timer);
            }
        }, 30);

        return () => clearInterval(timer);
    }, []);

    // Cursor blinking
    useEffect(() => {
        const cursorTimer = setInterval(() => {
            setShowCursor(prev => !prev);
        }, 500);
        return () => clearInterval(cursorTimer);
    }, []);

    // Filter members based on search and filters
    useEffect(() => {
        let filtered = mockMembers;

        if (searchTerm) {
            filtered = filtered.filter(member =>
                member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                member.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
                member.techStack.some(tech => tech.toLowerCase().includes(searchTerm.toLowerCase()))
            );
        }

        if (filters.year !== 'all') {
            filtered = filtered.filter(member => member.year === filters.year);
        }

        if (filters.role !== 'all') {
            filtered = filtered.filter(member => member.role.toLowerCase().includes(filters.role.toLowerCase()));
        }

        if (filters.techStack !== 'all') {
            filtered = filtered.filter(member =>
                member.techStack.some(tech => tech.toLowerCase().includes(filters.techStack.toLowerCase()))
            );
        }

        setFilteredMembers(filtered);
    }, [searchTerm, filters]);

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-[#00cc00] overflow-x-hidden">
            {/* Matrix-style background */}
            <div className="fixed inset-0 opacity-5 pointer-events-none">
                <div className="matrix-rain"></div>
            </div>

            {/* Terminal Header */}
            <div className="relative z-10 bg-black/80 border-b border-[#00ff00]/30 backdrop-blur-sm">
                <div className="container mx-auto px-6 py-8">
                    <div className="font-mono text-sm mb-4">
                        <span className="text-[#00ff00]">root@osdg:~$</span> ls -la /collective/members/
                    </div>
                    <h1 className="font-mono text-2xl md:text-4xl mb-4">
                        {terminalText}
                        <span className={`${showCursor ? 'opacity-100' : 'opacity-0'} transition-opacity`}>_</span>
                    </h1>
                    <div className="text-[#00d4ff] font-mono text-sm">
                        {`> ${filteredMembers.length} ACTIVE_MEMBERS FOUND`}
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-6 py-8 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Filter Panel */}
                    <div className="lg:col-span-1">
                        <FilterPanel
                            searchTerm={searchTerm}
                            setSearchTerm={setSearchTerm}
                            filters={filters}
                            setFilters={setFilters}
                        />
                        <div className="mt-8">
                            <RandomDeveloperGenerator members={mockMembers} />
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="lg:col-span-3">
                        {/* Member Spotlight */}
                        <MemberSpotlight members={mockMembers} />

                        {/* 3D Network Visualization */}
                        <NetworkVisualization members={mockMembers} />

                        {/* Team Grid */}
                        <div className="hexagon-grid mt-12">
                            <h2 className="text-xl font-mono text-[#00ff00] mb-6 glitch-text">
                                &gt; COLLECTIVE_MEMBERS.EXE
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                                {filteredMembers.map((member, index) => (
                                    <TeamMemberCard
                                        key={member.id}
                                        member={member}
                                        index={index}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                .matrix-rain {
                    background: linear-gradient(transparent, #0a0a0a),
                               repeating-linear-gradient(
                                 90deg,
                                 transparent,
                                 transparent 2px,
                                 rgba(0, 255, 0, 0.1) 2px,
                                 rgba(0, 255, 0, 0.1) 4px
                               );
                    animation: matrix-scroll 20s linear infinite;
                }

                @keyframes matrix-scroll {
                    0% { transform: translateY(-100vh); }
                    100% { transform: translateY(100vh); }
                }

                .glitch-text {
                    position: relative;
                    animation: glitch 2s infinite;
                }

                @keyframes glitch {
                    0%, 90%, 100% { transform: translate(0); }
                    20% { transform: translate(-2px, 2px); }
                    40% { transform: translate(-2px, -2px); }
                    60% { transform: translate(2px, 2px); }
                    80% { transform: translate(2px, -2px); }
                }
            `}</style>
        </div>
    );
}
