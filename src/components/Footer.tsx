import Image from "next/image";
import brandLogo from "@/assets/BrandLogo.png";

import { socials } from "@/utils/socials";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 text-white py-16 px-6 md:px-12 lg:px-24 shadow-inner">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
      {/* Logo Section */}
      <div className="flex flex-col items-center md:items-start">
        <div className="group">
        <Image
          src={brandLogo}
          alt="OSDG"
          className="w-36 mb-4 transition-all duration-300 group-hover:opacity-90 group-hover:scale-105"
          priority
        />
        </div>
        <p className="text-slate-300 text-sm mt-2 font-light tracking-wide">
        Fostering open source communities since 2016
        </p>
      </div>

        {/* Social Links */}
        <div className="flex flex-col items-center justify-center">
          <h3 className="text-lg font-semibold mb-4 text-slate-200">Connect With Us</h3>
          <div className="flex flex-wrap justify-center gap-4">
            {socials.map(([link, icon], idx) => (
              <a
                href={link}
                key={idx}
                className="w-10 h-10 bg-slate-600 rounded-full flex items-center justify-center 
                           text-slate-200 hover:bg-slate-500 hover:text-white hover:scale-110 
                           transform transition-all duration-200"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Social link ${idx + 1}`}
              >
                <FontAwesomeIcon icon={icon} className="text-lg" />
              </a>
            ))}
          </div>
        </div>

        {/* Address/Copyright */}
        <div className="flex flex-col items-center md:items-end text-right">
          <div className="text-slate-200">
            <h3 className="text-lg font-semibold mb-2">Open Source Developers Group</h3>
            <address className="not-italic text-sm text-slate-300 leading-relaxed">
              International Institute of Information<br />
              Technology, Hyderabad
            </address>
          </div>
          <div className="mt-6 pt-4 border-t border-slate-600 w-full text-center md:text-right">
            <p className="text-xs text-slate-400">&copy; {new Date().getFullYear()} OSDG. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
