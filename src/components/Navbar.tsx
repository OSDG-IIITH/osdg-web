import Link from "next/link";
import Image from "next/image";
import brandLogo from "@/assets/BrandLogo.png";

export default function Navbar() {
  const linkClass = "opacity-85 hover:opacity-100 text-xl";

  return (
    <nav className="flex flex-col md:flex-row justify-between items-center p-4 bg-[#2E303E] text-white">
      <Image src={brandLogo} alt="OSDG" className="w-24 pb-4 md:pb-0" />
      <div className="w-full md:w-1/3 flex justify-evenly">
        <Link className={linkClass} href="/">
          Home
        </Link>
        <Link className={linkClass} href="/projects">
          Projects
        </Link>
        <Link className={linkClass} href="/events">
          Events
        </Link>
        <Link className={linkClass} href="/team">
          Team
        </Link>
      </div>
    </nav>
  );
}
