"use client";

import React, { useState } from 'react';
import teamData from '../../data/teams.json';

const placeholderColors = ['#FF6B6B', '#6BCB77', '#4D96FF', '#FFC04E', '#845EC2'];

const getInitials = (name: string) => {
  return name.split(' ').map(n => n[0]).join('').toUpperCase();
};

const getProfileLink = (name: string) => {
  const parts = name.toLowerCase().split(' ');
  return `https://clubs.iiit.ac.in/profile/${parts[0]}.${parts[parts.length - 1]}`;
};

const mapRoleToCategory = (role: string): string => {
  const lower = role.toLowerCase();
  if (lower.includes('tech')) return 'Tech';
  if (lower.includes('corporate') || lower.includes('pr') || lower.includes('outreach')) return 'Corporate';
  if (lower.includes('event') || lower.includes('logistics')) return 'Events';
  if (lower.includes('design') || lower.includes('social')) return 'Design';
  if (lower.includes('advisor')) return 'Advisor';
  if (lower.includes('coordinator')) return 'Coordinator';
  return 'Other';
};

interface TeamMember {
  name: string;
  role: string;
  tenure: string;
  imageUrl: string;
  extra?: string;
}

const TeamCard = ({ name, role, tenure, imageUrl, extra, index }: TeamMember & { index: number }) => {
  const bgColor = placeholderColors[index % placeholderColors.length];
  const profileLink = getProfileLink(name);

  return (
    <a
      href={profileLink}
      target="_blank"
      rel="noopener noreferrer"
      className="transition-transform duration-300 hover:scale-105"
    >
      <div className="flex flex-col items-center text-center bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-2xl hover:ring-2 hover:ring-indigo-400 transform transition duration-300">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={name}
            className="w-28 h-28 object-cover rounded-full mb-4 border-4 border-gray-700 hover:border-indigo-500 transition-all"
          />
        ) : (
          <div
            className="w-28 h-28 rounded-full flex items-center justify-center text-white text-3xl font-bold mb-4 shadow-inner"
            style={{ backgroundColor: bgColor }}
          >
            {getInitials(name)}
          </div>
        )}
        <h3 className="text-white font-semibold text-xl tracking-wide">{name}</h3>
        <p className="text-indigo-300 text-sm mt-1">{role} ({tenure})</p>
        {extra && <p className="text-gray-400 text-xs mt-2 italic">{extra}</p>}
      </div>
    </a>
  );
};

const categories = ['Coordinator', 'Tech', 'Events', 'Corporate', 'Design', 'Advisor', 'All'];

const TeamPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredData = teamData.filter((member: TeamMember) => {
    const category = mapRoleToCategory(member.role);
    const matchesCategory = selectedCategory === 'All' || category === selectedCategory;
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f111a] to-[#1f2233] text-white py-12 px-6 font-sans">
      <h1 className="text-5xl font-extrabold text-center mb-8 text-indigo-300 drop-shadow">Meet the Team</h1>

      <div className="flex justify-center flex-wrap gap-4 mb-8">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-full text-sm font-medium shadow-md transition-all ${
              selectedCategory === cat
                ? 'bg-indigo-500 text-white'
                : 'bg-gray-700 hover:bg-indigo-400 hover:text-white'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="flex justify-center mb-10">
        <input
          type="text"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-4 py-2 w-full max-w-md rounded-lg bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <div
        className={`grid gap-10 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-w-7xl mx-auto ${
          filteredData.length % 4 === 1
            ? 'lg:justify-center'
            : filteredData.length % 4 === 2
            ? 'lg:justify-start lg:pl-24'
            : ''
        }`}
      >
        {filteredData.map((member, idx) => (
          <TeamCard key={idx} index={idx} {...member} />
        ))}
      </div>

    </div>
  );
};

export default TeamPage;
