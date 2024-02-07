import Image from "next/image";
import brandLogo from "@/assets/BrandLogo.png";

import { socials } from "@/utils/socials";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Footer() {
  return (
    <footer className="flex justify-around px-32 py-12 bg-slate-700 text-white">
      <div className="text-xs h-auto">
        <Image src={brandLogo} alt="OSDG" className="w-32 mb-6" />
        <p>&copy; 2024</p>
        <p>Open Source Developers Group</p>
        <p>International Institute of Information</p>
        <p>Technology, Hyderabad</p>
      </div>
      <div className="flex h-auto justify-center items-center">
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
      <div className="h-auto flex flex-col justify-center items-end">
        <p className="text-l font-bold">Reach Us</p>
        <a  className="text-xs" href="mailto:osdg@students.iiit.ac.in">osdg@students.iiit.ac.in</a>
      </div>
    </footer>
  );
}
