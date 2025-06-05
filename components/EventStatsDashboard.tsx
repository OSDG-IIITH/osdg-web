'use client';

import { useState, useEffect } from 'react';
import { Calendar, MapPin, Users, Clock, Star, Award, Coffee } from 'lucide-react';

interface EventStats {
    totalEvents: number;
    totalAttendees: number;
    upcomingEvents: number;
    averageRating: number;
    topCategories: { name: string; count: number }[];
    recentAchievements: string[];
}

export default function EventStatsDashboard() {
    const [stats, setStats] = useState<EventStats>({
        totalEvents: 0,
        totalAttendees: 0,
        upcomingEvents: 0,
        averageRating: 0,
        topCategories: [],
        recentAchievements: []
    });

    const [animatedStats, setAnimatedStats] = useState({
        totalEvents: 0,
        totalAttendees: 0,
        upcomingEvents: 0,
        averageRating: 0
    });

    // Simulate loading stats (replace with actual API call)
    useEffect(() => {
        const mockStats: EventStats = {
            totalEvents: 47,
            totalAttendees: 1247,
            upcomingEvents: 8,
            averageRating: 4.7,
            topCategories: [
                { name: 'Workshops', count: 18 },
                { name: 'Talks', count: 15 },
                { name: 'Hackathons', count: 10 },
                { name: 'Socials', count: 4 }
            ],
            recentAchievements: [
                'Hosted largest hackathon with 200+ participants',
                'Achieved 95% satisfaction rate for workshops',
                'Collaborated with 15+ industry partners',
                'Launched mentorship program'
            ]
        };

        setStats(mockStats);

        // Animate numbers
        const animateNumber = (target: number, setter: (value: number) => void, duration: number = 2000) => {
            const start = 0;
            const increment = target / (duration / 16);
            let current = start;

            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                setter(Math.floor(current));
            }, 16);
        };

        setTimeout(() => {
            animateNumber(mockStats.totalEvents, (value) =>
                setAnimatedStats(prev => ({ ...prev, totalEvents: value })));
            animateNumber(mockStats.totalAttendees, (value) =>
                setAnimatedStats(prev => ({ ...prev, totalAttendees: value })));
            animateNumber(mockStats.upcomingEvents, (value) =>
                setAnimatedStats(prev => ({ ...prev, upcomingEvents: value })));
            animateNumber(mockStats.averageRating * 10, (value) =>
                setAnimatedStats(prev => ({ ...prev, averageRating: value / 10 })));
        }, 500);
    }, []);

    const statCards = [
        {
            icon: Calendar,
            label: 'TOTAL_EVENTS',
            value: animatedStats.totalEvents,
            suffix: '',
            color: 'text-green-400 border-green-500/50',
            bgColor: 'bg-green-500/10'
        },
        {
            icon: Users,
            label: 'ATTENDEES',
            value: animatedStats.totalAttendees,
            suffix: '',
            color: 'text-cyan-400 border-cyan-500/50',
            bgColor: 'bg-cyan-500/10'
        },
        {
            icon: Clock,
            label: 'UPCOMING',
            value: animatedStats.upcomingEvents,
            suffix: '',
            color: 'text-yellow-400 border-yellow-500/50',
            bgColor: 'bg-yellow-500/10'
        },
        {
            icon: Star,
            label: 'AVG_RATING',
            value: animatedStats.averageRating,
            suffix: '/5.0',
            color: 'text-pink-400 border-pink-500/50',
            bgColor: 'bg-pink-500/10'
        }
    ];

    return (
        <div className="space-y-6">
            {/* Main Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {statCards.map(({ icon: Icon, label, value, suffix, color, bgColor }) => (
                    <div key={label} className={`terminal-window ${bgColor}`}>
                        <div className="terminal-header">
                            <div className="terminal-dot red"></div>
                            <div className="terminal-dot yellow"></div>
                            <div className="terminal-dot green"></div>
                            <span className="text-green-400 text-xs">{label.toLowerCase()}.log</span>
                        </div>
                        <div className="p-4 text-center">
                            <Icon className={`mx-auto mb-2 ${color.split(' ')[0]}`} size={24} />
                            <div className={`text-2xl font-bold font-mono ${color.split(' ')[0]} mb-1`}>
                                {typeof value === 'number' && value % 1 !== 0 ? value.toFixed(1) : value}{suffix}
                            </div>
                            <div className="text-xs text-gray-400 font-mono">{label}</div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Category Breakdown */}
            <div className="terminal-window">
                <div className="terminal-header">
                    <div className="terminal-dot red"></div>
                    <div className="terminal-dot yellow"></div>
                    <div className="terminal-dot green"></div>
                    <span className="text-green-400 text-sm">event_categories.data</span>
                </div>
                <div className="p-4">
                    <div className="text-green-400 text-sm font-mono mb-4">CATEGORY_DISTRIBUTION:</div>
                    <div className="space-y-3">
                        {stats.topCategories.map((category, index) => {
                            const percentage = (category.count / stats.totalEvents) * 100;
                            return (
                                <div key={category.name} className="space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-cyan-400 font-mono">{category.name}</span>
                                        <span className="text-gray-400">{category.count} events ({percentage.toFixed(1)}%)</span>
                                    </div>
                                    <div className="w-full bg-gray-800 rounded-full h-2">
                                        <div
                                            className="bg-gradient-to-r from-green-500 to-cyan-500 h-2 rounded-full transition-all duration-1000"
                                            style={{ width: `${percentage}%` }}
                                        ></div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Recent Achievements */}
            <div className="terminal-window">
                <div className="terminal-header">
                    <div className="terminal-dot red"></div>
                    <div className="terminal-dot yellow"></div>
                    <div className="terminal-dot green"></div>
                    <span className="text-green-400 text-sm">achievements.log</span>
                </div>
                <div className="p-4">
                    <div className="text-green-400 text-sm font-mono mb-4 flex items-center gap-2">
                        <Award size={16} />
                        RECENT_ACHIEVEMENTS:
                    </div>
                    <div className="space-y-3">
                        {stats.recentAchievements.map((achievement, index) => (
                            <div
                                key={index}
                                className="flex items-start gap-3 bg-green-500/5 border border-green-500/20 rounded p-3
                          hover:bg-green-500/10 transition-all duration-300"
                            >
                                <div className="text-green-400 mt-1">→</div>
                                <div className="text-gray-300 text-sm">{achievement}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

function ActivityItem({ time, action, user }: { time: string; action: string; user: string }) {
    return (
        <div className="flex items-center gap-3 text-xs font-mono">
            <span className="text-green-400 opacity-60">[{time}]</span>
            <span className="text-gray-300 flex-1">{action}</span>
            <span className="text-cyan-400">{user}</span>
        </div>
    );
}
