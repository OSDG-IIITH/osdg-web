import Image from "next/image";
import introGraphic from "@/assets/IntroGraphic.svg";
import aboutGraphic from "@/assets/AboutGraphic.svg";
import { IconDefinition } from "@fortawesome/free-brands-svg-icons";
import {
  faFacebook,
  faGithub,
  faLinkedin,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Home() {
  const socials: [string, IconDefinition][] = [
    ["https://www.facebook.com/groups/185567594878116", faFacebook],
    ["https://github.com/OSDG-IIITH", faGithub],
    ["https://www.linkedin.com/company/74330374", faLinkedin],
    ["https://www.instagram.com/osdg.iiith", faInstagram],
  ];

  return (
    <>
      <div
        className="text-white min-h-screen flex items-center justify-between"
        style={{
          background:
            "radial-gradient(circle at 0vw 100vh, #304154 0%, #1c1e26 20%)",
        }}
      >
        <div className="basis-1/12 flex flex-col items-center justify-center">
          {socials.map(([link, icon], idx) => (
            <a
              href={link}
              key={idx}
              className="py-8 opacity-60 hover:opacity-100 w-8 h-8"
            >
              <FontAwesomeIcon icon={icon}/>
            </a>
          ))}
        </div>
        <div className="basis-4/12">
          <h1 className="text-7xl font-extrabold leading-tight">
            Open Source Developers Group
          </h1>
          <p className="text-xl pt-12">
            Hi! We&apos;re OSDG. We like to make stuff, break stuff, and learn
            new things, which is especially fun when we do it together!
          </p>
        </div>
        <div className="basis-7/12 flex items-center justify-center">
          <Image src={introGraphic} alt="intro graphic" />
        </div>
      </div>

      <div className="flex flex-col justify-center items-center py-12">
        <h2 className="text-4xl font-bold">About Us</h2>
        <div className="flex items-center justify-evenly">
          <div className="basis-2/5 flex justify-center items-center">
            <Image src={aboutGraphic} alt="about graphic" />
          </div>
          <div className="basis-3/5 pr-64 text-xl flex flex-col justify-center items-center">
            <p className="my-8">
              The Open Source Developers Group at IIIT Hyderabad is dedicated to
              helping student developers improve their skills and contribute to
              the open-source community in a multitude of ways. Officially, it
              falls under the Center for Open Source at IIIT-H and is a
              completely student-run organisation.
            </p>
            <p>
              The institution is known for actively participating in global
              programs like the Google Summer of Code, and we at OSDG are
              dedicated to encouraging more involvement in such areas. The group
              also hosts several of its own initiatives, like community projects
              and seminars, to help cultivate the open-source culture in the
              student community.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
