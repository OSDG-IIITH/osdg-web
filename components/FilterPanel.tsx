'use client';

import { useState } from 'react';
import { Search, Filter } from 'lucide-react';

interface FilterPanelProps {
    searchTerm: string;
    setSearchTerm: (term: string) => void;
    filters: {
        year: string;
        role: string;
        techStack: string;
    };
    setFilters: (filters: any) => void;
}

export function FilterPanel({ searchTerm, setSearchTerm, filters, setFilters }: FilterPanelProps) {
    const [isExpanded, setIsExpanded] = useState(false);

    const years = ['all', '2023', '2024'];
    const roles = ['all', 'lead', 'engineer', 'architect'];
    const techStacks = ['all', 'react', 'python', 'node.js', 'docker', 'kubernetes', 'rust', 'golang'];

    return (
        <div className="bg-black/60 border border-[#00ff00]/30 rounded-lg p-6 backdrop-blur-sm">
            <div className="flex items-center gap-2 mb-4">
                <Filter className="w-5 h-5 text-[#00d4ff]" />
                <h3 className="font-mono text-[#00ff00] text-lg">SEARCH_FILTERS.EXE</h3>
            </div>

            {/* Search Bar */}
            <div className="relative mb-6">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#00cc00]" />
                <input
                    type="text"
                    placeholder="grep -i 'developer' /collective/*"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-black/80 border border-[#00ff00]/50 rounded px-10 py-3 text-[#00cc00] placeholder-[#00cc00]/50 font-mono text-sm focus:outline-none focus:border-[#00d4ff] focus:ring-1 focus:ring-[#00d4ff]/50 transition-all"
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs text-[#00cc00]/50 font-mono">
                    ESC
                </div>
            </div>

            {/* Filter Options */}
            <div className="space-y-4">
                {/* Year Filter */}
                <div>
                    <label className="block text-sm font-mono text-[#00d4ff] mb-2">
                        $ filter --year
                    </label>
                    <select
                        value={filters.year}
                        onChange={(e) => setFilters({ ...filters, year: e.target.value })}
                        className="w-full bg-black/80 border border-[#00ff00]/50 rounded px-3 py-2 text-[#00cc00] font-mono text-sm focus:outline-none focus:border-[#00d4ff] focus:ring-1 focus:ring-[#00d4ff]/50"
                    >
                        {years.map(year => (
                            <option key={year} value={year} className="bg-black">
                                {year === 'all' ? 'all_years' : year}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Role Filter */}
                <div>
                    <label className="block text-sm font-mono text-[#00d4ff] mb-2">
                        $ filter --role
                    </label>
                    <select
                        value={filters.role}
                        onChange={(e) => setFilters({ ...filters, role: e.target.value })}
                        className="w-full bg-black/80 border border-[#00ff00]/50 rounded px-3 py-2 text-[#00cc00] font-mono text-sm focus:outline-none focus:border-[#00d4ff] focus:ring-1 focus:ring-[#00d4ff]/50"
                    >
                        {roles.map(role => (
                            <option key={role} value={role} className="bg-black">
                                {role === 'all' ? 'all_roles' : role}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Tech Stack Filter */}
                <div>
                    <label className="block text-sm font-mono text-[#00d4ff] mb-2">
                        $ filter --tech
                    </label>
                    <select
                        value={filters.techStack}
                        onChange={(e) => setFilters({ ...filters, techStack: e.target.value })}
                        className="w-full bg-black/80 border border-[#00ff00]/50 rounded px-3 py-2 text-[#00cc00] font-mono text-sm focus:outline-none focus:border-[#00d4ff] focus:ring-1 focus:ring-[#00d4ff]/50"
                    >
                        {techStacks.map(tech => (
                            <option key={tech} value={tech} className="bg-black">
                                {tech === 'all' ? 'all_technologies' : tech}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Terminal-style output */}
            <div className="mt-6 p-3 bg-black/80 rounded border border-[#00ff00]/20">
                <div className="font-mono text-xs text-[#00cc00]/70">
                    <div>$ ps aux | grep developers</div>
                    <div className="text-[#00d4ff]">
                        {searchTerm && `> searching for: "${searchTerm}"`}
                    </div>                    <div className="text-[#00ff00]">
                        {`> filters_active: ${Object.values(filters).filter((f: string) => f !== 'all').length}`}
                    </div>
                </div>
            </div>

            {/* Reset Filters */}
            <button
                onClick={() => {
                    setSearchTerm('');
                    setFilters({ year: 'all', role: 'all', techStack: 'all' });
                }}
                className="w-full mt-4 bg-[#ff3333]/20 hover:bg-[#ff3333]/30 border border-[#ff3333]/50 text-[#ff3333] px-4 py-2 rounded font-mono text-sm transition-all hover:scale-105"
            >
                $ clear --all-filters
            </button>
        </div>
    );
}