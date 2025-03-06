"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import brandLogo from "@/assets/BrandLogo.png";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const linkClass = "relative py-2 px-3 rounded-md font-medium text-lg transition-all duration-300 hover:text-white hover:scale-105 after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-white after:left-0 after:-bottom-1 after:transition-all after:duration-300 hover:after:w-full";

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-[#2E303E]/90 text-gray-200 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center">
              <Image
                src={brandLogo}
                alt="OSDG"
                className="w-auto h-10 transition-transform duration-300 hover:scale-105"
                priority
              />
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            <Link className={linkClass} href="/projects">Projects</Link>
            <Link className={linkClass} href="/events">Events</Link>
            <Link className={linkClass} href="/team">Team</Link>
            <Link className={`${linkClass} bg-indigo-600/70 hover:bg-indigo-500 px-4 py-2 rounded-lg hover:after:w-0`} href="/hackiiit">HackIIIT</Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-200 hover:text-white hover:bg-[#3E4050] focus:outline-none transition duration-300"
              aria-expanded={isOpen}
            >
              <span className="sr-only">Open main menu</span>
              {!isOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 bg-[#2E303E] border-t border-gray-700">
            <Link href="/" className="block px-3 py-2 text-base font-medium rounded-md hover:bg-[#3E4050] transition duration-300">Home</Link>
            <Link href="/projects" className="block px-3 py-2 text-base font-medium rounded-md hover:bg-[#3E4050] transition duration-300">Projects</Link>
            <Link href="/events" className="block px-3 py-2 text-base font-medium rounded-md hover:bg-[#3E4050] transition duration-300">Events</Link>
            <Link href="/team" className="block px-3 py-2 text-base font-medium rounded-md hover:bg-[#3E4050] transition duration-300">Team</Link>
            <Link href="/hackiiit" className="block px-3 py-2 text-base font-medium bg-indigo-600/80 rounded-md hover:bg-indigo-500 transition duration-300">HackIIIT</Link>
          </div>
        </div>
      )}
    </nav>
  );
}
