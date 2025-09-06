"use client";

import React from "react";
import Link from "next/link";
import { socials } from "@/utils/socials";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faYoutube,
  faInstagram,
  faGithub,
  faDiscord,
  faFacebook,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

export default function SocialSidebar() {
  // Find the URLs for the social platforms we want to display
  const youtubeURL = socials.find(([_, icon]) => icon.iconName === "youtube")?.[0] || "https://www.youtube.com/@OSDG-IIITH";
  const instagramURL = socials.find(([_, icon]) => icon.iconName === "instagram")?.[0] || "https://www.instagram.com/osdg.iiith";
  const githubURL = socials.find(([_, icon]) => icon.iconName === "github")?.[0] || "https://github.com/OSDG-IIITH";
  const discordURL = "https://discord.gg/osdg-iiith";
  const facebookURL = "https://www.facebook.com/groups/185567594878116";
  const linkedinURL = "https://www.linkedin.com/company/osdg/";
  const emailURL = "mailto:osdg@students.iiit.ac.in";

  return (
    <div className="fixed bottom-5 right-5 z-40">
      <div className="flex flex-col items-center gap-4 py-4 px-3 rounded-full bg-black shadow-lg">
        {/* YouTube */}
        <Link
          href={youtubeURL}
          target="_blank"
          rel="noopener noreferrer"
          className="text-red-600 hover:text-red-700 transition-colors duration-300"
          aria-label="YouTube"
        >
          <FontAwesomeIcon icon={faYoutube} className="w-5 h-5" />
        </Link>

        {/* Discord */}
        <Link
          href={discordURL}
          target="_blank"
          rel="noopener noreferrer"
          className="text-red-600 hover:text-red-700 transition-colors duration-300"
          aria-label="Discord"
        >
          <FontAwesomeIcon icon={faDiscord} className="w-5 h-5" />
        </Link>

        {/* Instagram */}
        <Link
          href={instagramURL}
          target="_blank"
          rel="noopener noreferrer"
          className="text-red-600 hover:text-red-700 transition-colors duration-300"
          aria-label="Instagram"
        >
          <FontAwesomeIcon icon={faInstagram} className="w-5 h-5" />
        </Link>

        {/* Facebook */}
        <Link
          href={facebookURL}
          target="_blank"
          rel="noopener noreferrer"
          className="text-red-600 hover:text-red-700 transition-colors duration-300"
          aria-label="Facebook"
        >
          <FontAwesomeIcon icon={faFacebook} className="w-5 h-5" />
        </Link>

        {/* LinkedIn */}
        <Link
          href={linkedinURL}
          target="_blank"
          rel="noopener noreferrer"
          className="text-red-600 hover:text-red-700 transition-colors duration-300"
          aria-label="LinkedIn"
        >
          <FontAwesomeIcon icon={faLinkedin} className="w-5 h-5" />
        </Link>

        {/* GitHub */}
        <Link
          href={githubURL}
          target="_blank"
          rel="noopener noreferrer"
          className="text-red-600 hover:text-red-700 transition-colors duration-300"
          aria-label="GitHub"
        >
          <FontAwesomeIcon icon={faGithub} className="w-5 h-5" />
        </Link>

        {/* Email */}
        <Link
          href={emailURL}
          className="text-red-600 hover:text-red-700 transition-colors duration-300"
          aria-label="Email"
        >
          <FontAwesomeIcon icon={faEnvelope} className="w-5 h-5" />
        </Link>
      </div>
    </div>
  );
}
