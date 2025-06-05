'use client';

import { useState, useEffect } from 'react';
import EventTimelineSpiral from '@/components/EventTimelineSpiral';
import EventCard from '@/components/EventCard';
import EventFilterPanel from '@/components/EventFilterPanel';
import EventStatsDashboard from '@/components/EventStatsDashboard';
import { Terminal, Zap } from 'lucide-react';

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

interface EventFilter {
    type: 'all' | 'workshop' | 'hackathon' | 'talk' | 'social';
    status: 'all' | 'completed' | 'upcoming' | 'live';
    searchTerm: string;
}

export default function EventsPage() {
    const [events, setEvents] = useState<Event[]>([]);
    const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
    const [filter, setFilter] = useState<EventFilter>({
        type: 'all',
        status: 'all',
        searchTerm: ''
    });
    const [viewMode, setViewMode] = useState<'timeline' | 'grid'>('timeline');
    const [isLoading, setIsLoading] = useState(true);

    // Mock events data - Replace with actual API call
    useEffect(() => {
        const mockEvents: Event[] = [
            {
                id: '001',
                title: 'Advanced React Workshop',
                date: new Date('2025-06-15T14:00:00'),
                type: 'workshop',
                description: 'Deep dive into React performance optimization, custom hooks, and advanced patterns. Learn how to build scalable React applications with industry best practices.',
                status: 'upcoming',
                rsvpCount: 45,
                location: 'Lab 1, IIIT-H',
                duration: '3 hours',
                speakers: ['Dr. Sarah Chen', 'Arjun Kumar'],
                tags: ['react', 'javascript', 'frontend', 'performance'],
                registrationUrl: 'https://osdg.iiit.ac.in/register/react-workshop'
            },
            {
                id: '002',
                title: 'HackIndia 2025',
                date: new Date('2025-07-20T09:00:00'),
                type: 'hackathon',
                description: 'India\'s largest student hackathon focusing on sustainability and social impact. 48 hours of intense coding, mentorship, and innovation.',
                status: 'upcoming',
                rsvpCount: 350,
                location: 'Campus Auditorium',
                duration: '48 hours',
                speakers: ['Tech Industry Leaders', 'OSDG Alumni'],
                tags: ['hackathon', 'sustainability', 'social-impact', 'innovation'],
                registrationUrl: 'https://hackindia.osdg.dev'
            },
            {
                id: '003',
                title: 'Open Source Contribution Bootcamp',
                date: new Date('2025-05-25T10:00:00'),
                type: 'workshop',
                description: 'Learn how to contribute to open source projects effectively. From finding the right projects to making your first PR.',
                status: 'completed',
                attendees: 78,
                location: 'Online',
                duration: '4 hours',
                speakers: ['Priya Sharma', 'Rahul Verma'],
                tags: ['open-source', 'git', 'github', 'collaboration']
            },
            {
                id: '004',
                title: 'AI/ML in Production',
                date: new Date('2025-06-08T16:00:00'),
                type: 'talk',
                description: 'Industry expert shares insights on deploying machine learning models in production environments. Real-world case studies and best practices.',
                status: 'live',
                rsvpCount: 120,
                location: 'Main Auditorium',
                duration: '90 minutes',
                speakers: ['Dr. Amit Patel', 'Senior ML Engineer at Google'],
                tags: ['ai', 'ml', 'production', 'deployment']
            },
            {
                id: '005',
                title: 'OSDG Game Night',
                date: new Date('2025-06-30T19:00:00'),
                type: 'social',
                description: 'Unwind with fellow developers! Board games, video games, pizza, and great conversations. Perfect for networking and making new friends.',
                status: 'upcoming',
                rsvpCount: 25,
                location: 'Student Lounge',
                duration: '3 hours',
                tags: ['networking', 'games', 'fun', 'community']
            },
            {
                id: '006',
                title: 'GraphQL Deep Dive',
                date: new Date('2025-04-18T14:00:00'),
                type: 'workshop',
                description: 'Master GraphQL from basics to advanced concepts. Build a complete API with subscriptions, authentication, and performance optimization.',
                status: 'completed',
                attendees: 42,
                location: 'Lab 2, IIIT-H',
                duration: '5 hours',
                speakers: ['Neha Gupta', 'Founder of GraphQL India'],
                tags: ['graphql', 'api', 'backend', 'apollo']
            }
        ];

        setTimeout(() => {
            setEvents(mockEvents);
            setIsLoading(false);
        }, 1000);
    }, []);

    // Filter events based on current filter
    const filteredEvents = events.filter(event => {
        const matchesType = filter.type === 'all' || event.type === filter.type;
        const matchesStatus = filter.status === 'all' || event.status === filter.status;
        const matchesSearch = filter.searchTerm === '' ||
            event.title.toLowerCase().includes(filter.searchTerm.toLowerCase()) ||
            event.description.toLowerCase().includes(filter.searchTerm.toLowerCase()) ||
            event.tags?.some(tag => tag.toLowerCase().includes(filter.searchTerm.toLowerCase()));

        return matchesType && matchesStatus && matchesSearch;
    });

    // Calculate event counts for filter panel
    const eventCounts = {
        total: events.length,
        workshop: events.filter(e => e.type === 'workshop').length,
        hackathon: events.filter(e => e.type === 'hackathon').length,
        talk: events.filter(e => e.type === 'talk').length,
        social: events.filter(e => e.type === 'social').length,
        completed: events.filter(e => e.status === 'completed').length,
        upcoming: events.filter(e => e.status === 'upcoming').length,
        live: events.filter(e => e.status === 'live').length
    };

    const handleRSVP = (eventId: string) => {
        // Implement RSVP functionality
        console.log('RSVP for event:', eventId);
        // Update the event's RSVP count
        setEvents(prev => prev.map(event =>
            event.id === eventId
                ? { ...event, rsvpCount: (event.rsvpCount || 0) + 1 }
                : event
        ));
    };

    const handleViewGallery = (eventId: string) => {
        // Implement gallery view functionality
        console.log('View gallery for event:', eventId);
    };

    return (
        <div className="min-h-screen bg-black text-white relative overflow-hidden">
            {/* Matrix rain background */}
            <div className="matrix-rain"></div>

            <div className="relative z-10 container mx-auto px-4 py-8">
                {/* Header Section */}
                <div className="text-center mb-12">
                    <h1 className="text-6xl font-bold font-mono mb-4 glitch-text" data-text="TIMELINE NEXUS">
                        <span className="text-green-400">TIMELINE</span>{' '}
                        <span className="text-cyan-400">NEXUS</span>
                    </h1>
                    <div className="text-gray-400 font-mono text-lg mb-8">
                        {'>'} Navigating the chronicles of OSDG events through time and space
                    </div>

                    {/* Terminal-style navigation */}
                    <div className="terminal-window max-w-2xl mx-auto">
                        <div className="terminal-header">
                            <div className="terminal-dot red"></div>
                            <div className="terminal-dot yellow"></div>
                            <div className="terminal-dot green"></div>
                            <span className="text-green-400 text-sm">event_navigator.sh</span>
                        </div>
                        <div className="p-4 font-mono text-left">
                            <div className="text-green-400">$ cd /events/timeline</div>
                            <div className="text-gray-300">$ ls -la</div>
                            <div className="text-cyan-400">
                                total {events.length} events found
                            </div>
                            <div className="text-yellow-400">
                                {eventCounts.upcoming} upcoming | {eventCounts.live} live | {eventCounts.completed} completed
                            </div>
                            <div className="text-green-400 animate-pulse">$ _</div>
                        </div>
                    </div>
                </div>

                {/* View Mode Toggle */}
                <div className="flex justify-center mb-8">
                    <div className="terminal-window">
                        <div className="terminal-header">
                            <div className="terminal-dot red"></div>
                            <div className="terminal-dot yellow"></div>
                            <div className="terminal-dot green"></div>
                            <span className="text-green-400 text-sm">view_mode.conf</span>
                        </div>
                        <div className="p-4 flex gap-4">
                            <button
                                onClick={() => setViewMode('timeline')}
                                className={`hacker-button flex items-center gap-2 px-4 py-2 rounded border font-mono text-sm transition-all
                          ${viewMode === 'timeline'
                                        ? 'bg-green-500/20 border-green-500/50 text-green-400'
                                        : 'bg-gray-800/30 border-gray-600/30 text-gray-300 hover:border-green-500/30'
                                    }`}
                            >
                                <Zap size={16} />
                                3D TIMELINE
                            </button>
                            <button
                                onClick={() => setViewMode('grid')}
                                className={`hacker-button flex items-center gap-2 px-4 py-2 rounded border font-mono text-sm transition-all
                          ${viewMode === 'grid'
                                        ? 'bg-cyan-500/20 border-cyan-500/50 text-cyan-400'
                                        : 'bg-gray-800/30 border-gray-600/30 text-gray-300 hover:border-cyan-500/30'
                                    }`}
                            >
                                <Terminal size={16} />
                                GRID VIEW
                            </button>
                        </div>
                    </div>
                </div>

                {/* Stats Dashboard */}
                <div className="mb-12">
                    <EventStatsDashboard />
                </div>

                {/* Main Content */}
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Filter Panel */}
                    <div className="lg:col-span-1">
                        <EventFilterPanel
                            filter={filter}
                            onFilterChange={setFilter}
                            eventCounts={eventCounts}
                        />
                    </div>

                    {/* Events Display */}
                    <div className="lg:col-span-3">
                        {isLoading ? (
                            <div className="terminal-window">
                                <div className="terminal-header">
                                    <div className="terminal-dot red"></div>
                                    <div className="terminal-dot yellow"></div>
                                    <div className="terminal-dot green"></div>
                                    <span className="text-green-400 text-sm">loading_events.log</span>
                                </div>
                                <div className="p-8 text-center">
                                    <div className="text-green-400 font-mono animate-pulse">
                                        Initializing Timeline Nexus...
                                    </div>
                                    <div className="text-gray-400 font-mono text-sm mt-2">
                                        Loading event data from the matrix...
                                    </div>
                                </div>
                            </div>
                        ) : viewMode === 'timeline' ? (
                            <div className="space-y-8">
                                <EventTimelineSpiral
                                    events={filteredEvents}
                                    onEventSelect={setSelectedEvent}
                                    selectedEvent={selectedEvent}
                                />

                                {/* Selected Event Details */}
                                {selectedEvent && (
                                    <div className="animate-fadeIn">
                                        <h3 className="text-green-400 font-mono text-lg mb-4">
                                            {'>'} SELECTED_EVENT_DETAILS:
                                        </h3>
                                        <EventCard
                                            event={selectedEvent}
                                            onRSVP={handleRSVP}
                                            onViewGallery={handleViewGallery}
                                        />
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="space-y-6">
                                <div className="text-green-400 font-mono text-lg mb-4">
                                    {'>'} EVENTS_GRID [{filteredEvents.length} results]:
                                </div>
                                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                                    {filteredEvents.map(event => (
                                        <EventCard
                                            key={event.id}
                                            event={event}
                                            onRSVP={handleRSVP}
                                            onViewGallery={handleViewGallery}
                                        />
                                    ))}
                                </div>

                                {filteredEvents.length === 0 && (
                                    <div className="terminal-window">
                                        <div className="terminal-header">
                                            <div className="terminal-dot red"></div>
                                            <div className="terminal-dot yellow"></div>
                                            <div className="terminal-dot green"></div>
                                            <span className="text-green-400 text-sm">no_results.log</span>
                                        </div>
                                        <div className="p-8 text-center">
                                            <div className="text-red-400 font-mono text-lg">
                                                ERROR: No events match current filters
                                            </div>
                                            <div className="text-gray-400 font-mono text-sm mt-2">
                                                Try adjusting your filter criteria
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                {/* Footer with ASCII Art */}
                <div className="mt-16 text-center">
                    <div className="terminal-window max-w-4xl mx-auto">
                        <div className="terminal-header">
                            <div className="terminal-dot red"></div>
                            <div className="terminal-dot yellow"></div>
                            <div className="terminal-dot green"></div>
                            <span className="text-green-400 text-sm">osdg_ascii.art</span>
                        </div>
                        <div className="p-6 font-mono text-xs text-green-400 whitespace-pre">
                            {`    _____ _____ _____  _____ 
   |     |   __|  _  ||   __|
   |  |  |__   |     ||  |  |
   |_____|_____|__|__||_____|
   
   Open Source Developers Guild
   IIIT Hyderabad - Est. 2018
   
   "Building Tomorrow's Open Source"`}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
