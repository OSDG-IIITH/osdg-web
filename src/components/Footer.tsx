import Image from "next/image";
import brandLogo from "@/assets/BrandLogo.png";

import { socials } from "@/utils/socials";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Footer() {
  return (
    <footer className="flex flex-col md:flex-row items-center justify-between md:px-32 py-12 bg-slate-700 text-white">
      <div className="text-xs h-auto">
        <Image src={brandLogo} alt="OSDG" className="w-24 mb-6" />
      </div>
      <div className="flex h-auto justify-center items-center pb-4">
        {socials.map(([link, icon], idx) => (
          <a
          href={link}
          key={idx}
          className="mx-2 opacity-60 hover:opacity-100 w-8 h-8"
          >
            <FontAwesomeIcon icon={icon} />
          </a>
        ))}
      </div>
      <div className="h-auto flex flex-col justify-center text-center">
        <p>&copy; 2024</p>
        <p>Open Source Developers Group</p>
        <p>International Institute of Information</p>
        <p>Technology, Hyderabad</p>
      </div>
    </footer>
  );
}
