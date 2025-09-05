"use client";

import React from 'react';

interface TeamMember {
    name: string;
    role: string;
    tenure: string;
    imageUrl: string;
    extra?: string;
}

interface MemberDetailPanelProps {
    member: TeamMember | null;
    isOpen: boolean;
    onClose: () => void;
}

const placeholderColors = ['#FF6B6B', '#6BCB77', '#4D96FF', '#FFC04E', '#845EC2'];

const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
};

const getProfileLink = (name: string) => {
    const parts = name.toLowerCase().split(' ');
    return `https://clubs.iiit.ac.in/profile/${parts[0]}.${parts[parts.length - 1]}`;
};

const MemberDetailPanel: React.FC<MemberDetailPanelProps> = ({ member, isOpen, onClose }) => {
    if (!isOpen || !member) return null;

    const bgColor = placeholderColors[member.name.length % placeholderColors.length];
    const profileLink = getProfileLink(member.name);

    return (
        <>
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity"
                onClick={onClose}
            />

            {/* Panel */}
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                <div className="bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full mx-4 transform transition-all">
                    {/* Header */}
                    <div className="flex justify-between items-center p-6 border-b border-gray-700">
                        <h2 className="text-xl font-bold text-white">Team Member</h2>
                        <button
                            onClick={onClose}
                            className="text-gray-400 hover:text-white transition-colors p-1"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                        <div className="flex flex-col items-center text-center mb-6">
                            {member.imageUrl ? (
                                <img
                                    src={member.imageUrl}
                                    alt={member.name}
                                    className="w-32 h-32 object-cover rounded-full mb-4 border-4 border-gray-600"
                                />
                            ) : (
                                <div
                                    className="w-32 h-32 rounded-full flex items-center justify-center text-white text-4xl font-bold mb-4 shadow-inner"
                                    style={{ backgroundColor: bgColor }}
                                >
                                    {getInitials(member.name)}
                                </div>
                            )}

                            <h3 className="text-white font-bold text-2xl mb-2">{member.name}</h3>
                            <p className="text-indigo-300 text-lg mb-1">{member.role}</p>
                            <p className="text-gray-400 text-sm">{member.tenure}</p>

                            {member.extra && (
                                <div className="mt-4 p-3 bg-gray-700 rounded-lg">
                                    <p className="text-gray-300 text-sm font-medium">Additional Info:</p>
                                    <p className="text-gray-400 text-sm mt-1">{member.extra}</p>
                                </div>
                            )}
                        </div>

                        {/* Actions */}
                        <div className="flex flex-col gap-3">
                            <a
                                href={profileLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-4 rounded-lg transition-colors text-center"
                            >
                                View Full Profile
                            </a>

                            <button
                                onClick={onClose}
                                className="w-full bg-gray-700 hover:bg-gray-600 text-white font-medium py-3 px-4 rounded-lg transition-colors"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default MemberDetailPanel;
