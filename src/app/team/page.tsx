import type { Metadata } from "next";
import fs from "fs";
import path from "path";
import {
  ReactElement,
  JSXElementConstructor,
  ReactNode,
  PromiseLikeOfReactNode,
  Key,
} from "react";
import Image from "next/image";

const teamMembers = JSON.parse(
  fs.readFileSync(path.resolve("./data/members.json"), "utf-8")
);

export const metadata: Metadata = {
  title: "Team",
};

const MembersLeft = ({
  heading,
  subHeading,
  teamRole,
}: {
  heading: string;
  subHeading: string;
  teamRole: string;
}) => {
  return (
    <div className="w-full md:flex md:flex-row justify-around py-10 md:py-20 align-middle items-center">
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-b-3xl m-10 inline-flex md:hidden flex-col items-center justify-center h-32 w-5/6">
        <h2 className="uppercase font-extrabold text-6xl">{heading}</h2>
        <h3 className="uppercase font-bold text-xl">{subHeading}</h3>
      </div>
      <div className="hidden bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full m-10 md:inline-flex flex-col items-center justify-center h-64 w-64 shrink-0">
        <h2 className="uppercase font-extrabold text-6xl">{heading}</h2>
        <h3 className="uppercase font-bold text-xl">{subHeading}</h3>
      </div>
      <div className="flex justify-center lg:justify-start w-full lg:w-[65%] flex-wrap p-10 mr-10">
        {teamMembers
          .filter(({ role }: { role: string }) => role === teamRole)
          .map(
            ({
              batch,
              emailID,
              imageURL,
              name,
            }: {
              batch: string;
              emailID: string;
              imageURL: string;
              name: string;
            }) => (
              <div key={emailID}>
                <div className="h-48 w-48 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl relative m-5">
                  <Image
                    width="200"
                    height="200"
                    src={imageURL}
                    alt={name}
                    className="object-cover h-full w-full rounded-3xl"
                  />

                  <div className="flex flex-col justify-between p-5 absolute opacity-0 top-0 left-0 h-full w-full fd-sh hover:opacity-100 transition-all bg-black bg-opacity-75 rounded-3xl">
                    <h2 className="text-xl font-semibold break-all text-wrap">
                      {batch}
                    </h2>
                    <div>
                      <a
                        href={`mailto:${emailID}`}
                        className="font-mono break-all text-wrap"
                      >
                        <p>{String(emailID).split("@")[0]}</p>
                        <p>@{String(emailID).split("@")[1]}</p>
                      </a>
                    </div>
                  </div>
                </div>
                <div className="uppercase font-semibold py-4">{name}</div>
              </div>
            )
          )}
      </div>
    </div>
  );
};

const MembersRight = ({
  heading,
  subHeading,
  teamRole,
}: {
  heading: string;
  subHeading: string;
  teamRole: string;
}) => {
  return (
    <div className="w-full md:flex md:flex-row justify-around py-20 align-middle items-center">
      <div className="bg-gradient-to-r from-emerald-500 to-teal-400 rounded-b-3xl m-10 inline-flex md:hidden flex-col items-center justify-center h-32 w-5/6 shrink-0">
        <h2 className="uppercase font-extrabold text-6xl">{heading}</h2>
        <h3 className="uppercase font-bold text-xl">{subHeading}</h3>
      </div>
      <div className="flex justify-center lg:justify-end w-full lg:w-[65%] flex-wrap p-10 mr-10">
        {teamMembers
          .filter(({ role }: { role: string }) => role === teamRole)
          .map(
            ({
              batch,
              emailID,
              imageURL,
              name,
            }: {
              batch: string;
              emailID: string;
              imageURL: string;
              name: string;
            }) => (
              <div key={emailID}>
                <div className="h-48 w-48 bg-gradient-to-r from-emerald-500 to-teal-400 rounded-3xl relative m-5">
                  {imageURL && (
                    <Image
                      width="200"
                      height="200"
                      src={imageURL}
                      alt={name}
                      className="object-cover h-full w-full rounded-3xl"
                    />
                  )}
                  <div className="flex flex-col justify-between p-5 absolute opacity-0 top-0 left-0 h-full w-full fd-sh hover:opacity-100 transition-all bg-black bg-opacity-75 rounded-3xl">
                    <h2 className="text-xl font-semibold break-all text-wrap">
                      {String(batch)}
                    </h2>
                    <div>
                      <a
                        href={`mailto:${emailID}`}
                        className="font-mono break-all text-wrap"
                      >
                        <p>{String(emailID).split("@")[0]}</p>
                        <p>@{String(emailID).split("@")[1]}</p>
                      </a>
                    </div>
                  </div>
                </div>
                <div className="uppercase font-semibold py-4">{name}</div>
              </div>
            )
          )}
      </div>
      <div className="hidden bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full m-10 md:inline-flex flex-col items-center justify-center h-64 w-64 shrink-0">
        <h2 className="uppercase font-extrabold text-6xl">{heading}</h2>
        <h3 className="uppercase font-bold text-xl">{subHeading}</h3>
      </div>
    </div>
  );
};

export default function Team() {
  return (
    <main className="overflow-hidden text-center flex flex-col justify-center bg-[#1c1e26] text-white">
      <div className="transition-transform duration-1000 ease-in-out transform-y-translate-full">
        <h1 className="text-5xl tracking-[0.5em] uppercase p-10 font-bold">
          The Team
        </h1>
      </div>

      <MembersLeft
        heading={"OSDG"}
        subHeading={"Coordinators"}
        teamRole={"Organizing Team Member"}
      />

      <MembersRight
        heading={"OSDG"}
        subHeading={"Advisors"}
        teamRole={"Advisor"}
      />

      <MembersLeft
        heading={"Tech"}
        subHeading={"& Events"}
        teamRole={"Tech/Events Team Member"}
      />

      <MembersRight
        heading={"Corp."}
        subHeading={"& Outreach"}
        teamRole={"Corporate/Outreach Team Member"}
      />

      <MembersLeft
        heading={"Design"}
        subHeading={"Team"}
        teamRole={"Design Team Member"}
      />
    </main>
  );
}
