'use client';

import Link from 'next/link';

export default function Navbar() {
    return (
        <nav className="p-6 border-b border-green-400/30 backdrop-blur-sm">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                <Link href="/" className="text-xl font-bold text-cyan-400 glitch-text">
                    [OSDG_IIITH]
                </Link>                <div className="hidden md:flex space-x-8">
                    {[
                        { label: './home', href: '/' },
                        { label: './team', href: '/team' },
                        { label: './projects', href: '/projects' },
                        { label: './events', href: '/events' }
                    ].map((item) => (
                        <Link
                            key={item.label}
                            href={item.href}
                            className="hover:text-cyan-400 transition-colors duration-300 hover:glitch-text"
                        >
                            {item.label}
                        </Link>
                    ))}
                </div>
            </div>
        </nav>
    );
}
