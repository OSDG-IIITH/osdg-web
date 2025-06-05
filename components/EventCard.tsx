'use client';

import { useState } from 'react';
import { Calendar, Users, MapPin, Clock, ExternalLink } from 'lucide-react';

interface Event {
    id: string;
    title: string;
    date: Date;
    type: 'workshop' | 'hackathon' | 'talk' | 'social';
    description: string;
    status: 'completed' | 'upcoming' | 'live';
    attendees?: number;
    image?: string;
    rsvpCount?: number;
    location?: string;
    duration?: string;
    speakers?: string[];
    tags?: string[];
    registrationUrl?: string;
}

interface EventCardProps {
    event: Event;
    onRSVP?: (eventId: string) => void;
    onViewGallery?: (eventId: string) => void;
}

export default function EventCard({ event, onRSVP, onViewGallery }: EventCardProps) {
    const [isExpanded, setIsExpanded] = useState(false);
    const [glitchText, setGlitchText] = useState('');

    const getTypeColor = (type: string) => {
        switch (type) {
            case 'workshop': return 'text-cyan-400 border-cyan-400';
            case 'hackathon': return 'text-pink-500 border-pink-500';
            case 'talk': return 'text-green-400 border-green-400';
            case 'social': return 'text-yellow-400 border-yellow-400';
            default: return 'text-white border-white';
        }
    };

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'completed':
                return (
                    <span className="px-2 py-1 text-xs bg-green-500/20 text-green-400 border border-green-500/50 rounded">
                        ✓ COMPLETED
                    </span>
                );
            case 'live':
                return (
                    <span className="px-2 py-1 text-xs bg-pink-500/20 text-pink-400 border border-pink-500/50 rounded animate-pulse">
                        ● LIVE
                    </span>
                );
            case 'upcoming':
                return (
                    <span className="px-2 py-1 text-xs bg-cyan-500/20 text-cyan-400 border border-cyan-500/50 rounded">
                        → UPCOMING
                    </span>
                );
            default:
                return null;
        }
    };

    const handleCardClick = () => {
        setIsExpanded(!isExpanded);
        // Add glitch effect on click
        setGlitchText(event.title);
        setTimeout(() => setGlitchText(''), 500);
    };

    const formatDate = (date: Date) => {
        return new Intl.DateTimeFormat('en-US', {
            weekday: 'short',
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        }).format(date);
    };

    const isUpcoming = event.status === 'upcoming';
    const isLive = event.status === 'live';

    return (
        <div
            className={`terminal-window overflow-hidden cursor-pointer transition-all duration-300 hover:scale-105 
                  ${isExpanded ? 'scale-105' : ''} 
                  ${isLive ? 'animate-pulse' : ''}`}
            onClick={handleCardClick}
        >
            <div className="terminal-header">
                <div className="terminal-dot red"></div>
                <div className="terminal-dot yellow"></div>
                <div className="terminal-dot green"></div>
                <span className="text-green-400 text-sm flex-1">
                    event_{event.id}.log
                </span>
                {getStatusBadge(event.status)}
            </div>

            <div className="p-6 space-y-4">
                {/* Event Title with Glitch Effect */}
                <div className="relative">
                    <h3
                        className={`text-xl font-bold text-white ${glitchText === event.title ? 'glitch-text' : ''}`}
                        data-text={event.title}
                    >
                        {event.title}
                    </h3>
                    <div className={`inline-block px-2 py-1 text-xs border rounded mt-2 ${getTypeColor(event.type)}`}>
                        {event.type.toUpperCase()}
                    </div>
                </div>

                {/* Event Info Grid */}
                <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-2 text-green-400">
                        <Calendar size={16} />
                        <span>{formatDate(event.date)}</span>
                    </div>

                    {event.duration && (
                        <div className="flex items-center gap-2 text-cyan-400">
                            <Clock size={16} />
                            <span>{event.duration}</span>
                        </div>
                    )}

                    {event.location && (
                        <div className="flex items-center gap-2 text-yellow-400">
                            <MapPin size={16} />
                            <span>{event.location}</span>
                        </div>
                    )}

                    {(event.attendees || event.rsvpCount) && (
                        <div className="flex items-center gap-2 text-pink-400">
                            <Users size={16} />
                            <span>
                                {event.status === 'completed'
                                    ? `${event.attendees} attended`
                                    : `${event.rsvpCount || 0} RSVPs`
                                }
                            </span>
                        </div>
                    )}
                </div>

                {/* Description */}
                <div className="text-gray-300 text-sm leading-relaxed">
                    {isExpanded ? event.description : event.description.slice(0, 100) + '...'}
                </div>

                {/* Speakers */}
                {event.speakers && event.speakers.length > 0 && (
                    <div className="space-y-2">
                        <div className="text-green-400 text-sm font-mono">SPEAKERS:</div>
                        <div className="flex flex-wrap gap-2">
                            {event.speakers.map((speaker, index) => (
                                <span
                                    key={index}
                                    className="px-2 py-1 bg-green-500/10 text-green-400 text-xs border border-green-500/30 rounded"
                                >
                                    {speaker}
                                </span>
                            ))}
                        </div>
                    </div>
                )}

                {/* Tags */}
                {event.tags && event.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                        {event.tags.map((tag, index) => (
                            <span
                                key={index}
                                className="px-2 py-1 bg-gray-700/50 text-gray-300 text-xs border border-gray-600 rounded"
                            >
                                #{tag}
                            </span>
                        ))}
                    </div>
                )}

                {/* Action Buttons */}
                {isExpanded && (
                    <div className="flex gap-3 pt-4 border-t border-green-500/30">
                        {isUpcoming && onRSVP && (
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onRSVP(event.id);
                                }}
                                className="hacker-button flex-1 bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-400 
                          border border-cyan-500/50 py-2 px-4 rounded font-mono text-sm
                          transition-all duration-300"
                            >
                                RSVP NOW
                            </button>
                        )}

                        {event.registrationUrl && (
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    window.open(event.registrationUrl, '_blank');
                                }}
                                className="hacker-button flex items-center gap-2 bg-green-500/20 hover:bg-green-500/30 
                          text-green-400 border border-green-500/50 py-2 px-4 rounded font-mono text-sm
                          transition-all duration-300"
                            >
                                <ExternalLink size={14} />
                                REGISTER
                            </button>
                        )}

                        {event.status === 'completed' && onViewGallery && (
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onViewGallery(event.id);
                                }}
                                className="hacker-button bg-pink-500/20 hover:bg-pink-500/30 text-pink-400 
                          border border-pink-500/50 py-2 px-4 rounded font-mono text-sm
                          transition-all duration-300"
                            >
                                VIEW GALLERY
                            </button>
                        )}
                    </div>
                )}

                {/* Countdown Timer for Upcoming Events */}
                {isUpcoming && (
                    <CountdownTimer targetDate={event.date} />
                )}
            </div>
        </div>
    );
}

// Countdown Timer Component
function CountdownTimer({ targetDate }: { targetDate: Date }) {
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    });

    useState(() => {
        const timer = setInterval(() => {
            const now = new Date().getTime();
            const distance = targetDate.getTime() - now;

            if (distance > 0) {
                setTimeLeft({
                    days: Math.floor(distance / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                    minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
                    seconds: Math.floor((distance % (1000 * 60)) / 1000)
                });
            }
        }, 1000);

        return () => clearInterval(timer);
    });

    return (
        <div className="bg-black/50 border border-cyan-500/30 rounded p-3">
            <div className="text-cyan-400 text-xs font-mono mb-2">COUNTDOWN:</div>
            <div className="grid grid-cols-4 gap-2 text-center">
                {Object.entries(timeLeft).map(([unit, value]) => (
                    <div key={unit} className="bg-cyan-500/10 border border-cyan-500/30 rounded p-2">
                        <div className="text-cyan-400 font-bold text-lg font-mono">{value}</div>
                        <div className="text-cyan-400/70 text-xs uppercase">{unit}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}
