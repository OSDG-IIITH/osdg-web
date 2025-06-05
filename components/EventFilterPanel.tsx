'use client';

import { useState } from 'react';
import { Filter, Calendar, Users, MapPin, Search } from 'lucide-react';

interface EventFilter {
    type: 'all' | 'workshop' | 'hackathon' | 'talk' | 'social';
    status: 'all' | 'completed' | 'upcoming' | 'live';
    searchTerm: string;
}

interface EventFilterPanelProps {
    filter: EventFilter;
    onFilterChange: (filter: EventFilter) => void;
    eventCounts: {
        total: number;
        workshop: number;
        hackathon: number;
        talk: number;
        social: number;
        completed: number;
        upcoming: number;
        live: number;
    };
}

export default function EventFilterPanel({ filter, onFilterChange, eventCounts }: EventFilterPanelProps) {
    const [isExpanded, setIsExpanded] = useState(false);

    const handleTypeChange = (type: EventFilter['type']) => {
        onFilterChange({ ...filter, type });
    };

    const handleStatusChange = (status: EventFilter['status']) => {
        onFilterChange({ ...filter, status });
    };

    const handleSearchChange = (searchTerm: string) => {
        onFilterChange({ ...filter, searchTerm });
    };

    const typeFilters = [
        { key: 'all' as const, label: 'ALL EVENTS', count: eventCounts.total },
        { key: 'workshop' as const, label: 'WORKSHOPS', count: eventCounts.workshop },
        { key: 'hackathon' as const, label: 'HACKATHONS', count: eventCounts.hackathon },
        { key: 'talk' as const, label: 'TALKS', count: eventCounts.talk },
        { key: 'social' as const, label: 'SOCIALS', count: eventCounts.social }
    ];

    const statusFilters = [
        { key: 'all' as const, label: 'ALL STATUS', count: eventCounts.total },
        { key: 'completed' as const, label: 'COMPLETED', count: eventCounts.completed },
        { key: 'upcoming' as const, label: 'UPCOMING', count: eventCounts.upcoming },
        { key: 'live' as const, label: 'LIVE', count: eventCounts.live }
    ];

    return (
        <div className="terminal-window">
            <div className="terminal-header cursor-pointer" onClick={() => setIsExpanded(!isExpanded)}>
                <div className="terminal-dot red"></div>
                <div className="terminal-dot yellow"></div>
                <div className="terminal-dot green"></div>
                <div className="flex items-center gap-2 flex-1">
                    <Filter size={16} />
                    <span className="text-green-400 text-sm">event_filters.conf</span>
                </div>
                <span className="text-green-400 text-xs">
                    {isExpanded ? '[-]' : '[+]'}
                </span>
            </div>

            <div className={`transition-all duration-300 overflow-hidden ${isExpanded ? 'max-h-96' : 'max-h-0'}`}>
                <div className="p-4 space-y-6">
                    {/* Search Input */}
                    <div className="space-y-2">
                        <div className="text-green-400 text-sm font-mono flex items-center gap-2">
                            <Search size={14} />
                            SEARCH_QUERY:
                        </div>
                        <div className="relative">
                            <input
                                type="text"
                                value={filter.searchTerm}
                                onChange={(e) => handleSearchChange(e.target.value)}
                                placeholder="Search events..."
                                className="w-full bg-black/50 border border-green-500/30 rounded px-3 py-2 
                          text-green-400 font-mono placeholder-green-400/50 focus:outline-none 
                          focus:border-cyan-500 focus:shadow-[0_0_10px_rgba(0,212,255,0.3)]"
                            />
                            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-400/50">
                                {'>'}_
                            </div>
                        </div>
                    </div>

                    {/* Event Type Filters */}
                    <div className="space-y-3">
                        <div className="text-green-400 text-sm font-mono flex items-center gap-2">
                            <Calendar size={14} />
                            EVENT_TYPE:
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                            {typeFilters.map(({ key, label, count }) => (
                                <button
                                    key={key}
                                    onClick={() => handleTypeChange(key)}
                                    className={`text-left p-2 rounded border transition-all duration-200 font-mono text-xs
                            ${filter.type === key
                                            ? 'bg-cyan-500/20 border-cyan-500/50 text-cyan-400'
                                            : 'bg-gray-800/30 border-gray-600/30 text-gray-300 hover:border-cyan-500/30'
                                        }`}
                                >
                                    <div className="flex justify-between items-center">
                                        <span>{label}</span>
                                        <span className="text-xs opacity-70">({count})</span>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Status Filters */}
                    <div className="space-y-3">
                        <div className="text-green-400 text-sm font-mono flex items-center gap-2">
                            <Users size={14} />
                            EVENT_STATUS:
                        </div>
                        <div className="space-y-2">
                            {statusFilters.map(({ key, label, count }) => (
                                <button
                                    key={key}
                                    onClick={() => handleStatusChange(key)}
                                    className={`w-full text-left p-2 rounded border transition-all duration-200 font-mono text-xs
                            ${filter.status === key
                                            ? 'bg-green-500/20 border-green-500/50 text-green-400'
                                            : 'bg-gray-800/30 border-gray-600/30 text-gray-300 hover:border-green-500/30'
                                        }`}
                                >
                                    <div className="flex justify-between items-center">
                                        <span>{label}</span>
                                        <span className="text-xs opacity-70">({count})</span>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="space-y-3">
                        <div className="text-green-400 text-sm font-mono">QUICK_ACTIONS:</div>
                        <div className="flex gap-2">
                            <button
                                onClick={() => onFilterChange({ type: 'all', status: 'all', searchTerm: '' })}
                                className="flex-1 bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/50 
                          py-2 px-3 rounded font-mono text-xs transition-all duration-200"
                            >
                                CLEAR_ALL
                            </button>
                            <button
                                onClick={() => onFilterChange({ ...filter, status: 'upcoming' })}
                                className="flex-1 bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-400 border border-yellow-500/50 
                          py-2 px-3 rounded font-mono text-xs transition-all duration-200"
                            >
                                UPCOMING_ONLY
                            </button>
                        </div>
                    </div>

                    {/* Current Filter Summary */}
                    <div className="bg-black/50 border border-green-500/30 rounded p-3">
                        <div className="text-green-400 text-xs font-mono mb-2">ACTIVE_FILTERS:</div>
                        <div className="space-y-1 text-xs">
                            <div className="text-gray-300">
                                Type: <span className="text-cyan-400">{filter.type.toUpperCase()}</span>
                            </div>
                            <div className="text-gray-300">
                                Status: <span className="text-green-400">{filter.status.toUpperCase()}</span>
                            </div>                            {filter.searchTerm && (
                                <div className="text-gray-300">
                                    Search: <span className="text-yellow-400">&quot;{filter.searchTerm}&quot;</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
