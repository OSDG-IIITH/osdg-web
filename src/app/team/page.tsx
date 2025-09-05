"use client";

import React, { useState } from 'react';
import teamData from '../../data/teams.json';
import ForceGraph from '../../components/ForceGraph';
import MemberDetailPanel from '../../components/MemberDetailPanel';

const mapRoleToCategory = (role: string): string => {
  const lower = role.toLowerCase();
  if (lower.includes('tech')) return 'Tech/Events';
  if (lower.includes('corporate') || lower.includes('pr') || lower.includes('outreach')) return 'Corporate & PR';
  if (lower.includes('event') || lower.includes('logistics')) return 'Events & Logistics';
  if (lower.includes('design') || lower.includes('social')) return 'Social Media & Design';
  if (lower.includes('advisor')) return 'Advisors';
  if (lower.includes('coordinator')) return 'Coordinators';
  return 'Other';
};

interface TeamMember {
  name: string;
  role: string;
  tenure: string;
  imageUrl: string;
  extra?: string;
}

const TeamPage: React.FC = () => {
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  const handleMemberClick = (member: TeamMember) => {
    setSelectedMember(member);
    setIsPanelOpen(true);
  };

  const handlePanelClose = () => {
    setIsPanelOpen(false);
    setSelectedMember(null);
  };

  // Group members by category
  const groupedMembers = teamData.reduce((groups: Record<string, TeamMember[]>, member: TeamMember) => {
    const category = mapRoleToCategory(member.role);
    if (!groups[category]) {
      groups[category] = [];
    }
    groups[category].push(member);
    return groups;
  }, {});

  // Sort categories by importance
  const categoryOrder = ['Coordinators', 'Advisors', 'Tech/Events', 'Corporate & PR', 'Events & Logistics', 'Social Media & Design', 'Other'];
  const sortedCategories = categoryOrder.filter(cat => groupedMembers[cat]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f111a] to-[#1f2233] text-white py-12 px-6 font-sans">
      <h1 className="text-5xl font-extrabold text-center mb-8 text-indigo-300 drop-shadow">Meet the Team</h1>
      <p className="text-center text-gray-300 mb-12 max-w-2xl mx-auto">
        Explore our team network! Click on any team member to learn more about them.
      </p>

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {sortedCategories.map(category => (
            <div key={category} className="text-center">
              <h2 className="text-3xl font-bold text-indigo-200 mb-8">{category}</h2>
              <ForceGraph
                teamName={category}
                members={groupedMembers[category]}
                onMemberClick={handleMemberClick}
              />
            </div>
          ))}
        </div>
      </div>

      <MemberDetailPanel
        member={selectedMember}
        isOpen={isPanelOpen}
        onClose={handlePanelClose}
      />
    </div>
  );
};

export default TeamPage;
