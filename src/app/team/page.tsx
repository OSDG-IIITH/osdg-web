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

const teamMembers = JSON.parse(
  fs.readFileSync(path.resolve("./data/members.json"), "utf-8")
);

export const metadata: Metadata = {
  title: "Team",
};

export default function Team() {
  let numMembersCoord = teamMembers.filter(
    (member: { role: string }) => member.role === "Organizing Team Member"
  ).length;

  let numMembersTech = teamMembers.filter(
    (member: { role: string }) => member.role === "Tech/Events Team Member"
  ).length;

  let numMembersCorp = teamMembers.filter(
    (member: { role: string }) =>
      member.role === "Corporate/Outreach Team Member"
  ).length;

  let numMembersDesign = teamMembers.filter(
    (member: { role: string }) => member.role === "Design Team Member"
  ).length;

  return (
    <main className="overflow-hidden text-center flex flex-col justify-center bg-[#1c1e26] text-white">
      <div
        className={`transition-transform duration-1000 ease-in-out transform-y-translate-full`}
      >
        <h1 className="text-5xl tracking-[0.5em] uppercase p-10 font-bold">
          The Team
        </h1>
      </div>

      <div>
        <div className="w-full md:flex md:flex-row justify-around py-10 md:py-20 align-middle">
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-b-3xl m-10 inline-flex md:hidden flex-col items-center justify-center h-32 w-5/6">
            <h2 className="uppercase font-extrabold text-6xl">OSDG</h2>
            <h3 className="uppercase font-bold text-xl">Coordinators</h3>
          </div>
          <div className="hidden bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full m-10 md:inline-flex flex-col items-center justify-center h-64 w-64">
            <h2 className="uppercase font-extrabold text-6xl">OSDG</h2>
            <h3 className="uppercase font-bold text-xl">Coordinators</h3>
          </div>
          {/* TODO: Make it so that if the number of people is less than 3, reduce the values to be maximum 3 */}
          <div
            // className={`grid grid-cols-1 gap-5 md:grid-cols-${Math.min(
            //   2,
            //   numMembersCoord
            // )} lg:grid-cols-${Math.min(
            //   3,
            //   numMembersCoord
            // )} xl:grid-cols-${Math.min(
            //   4,
            //   numMembersCoord
            // )} 2xl:grid-cols-${Math.min(
            //   5,
            //   numMembersCoord
            // )} place-items-center`}
            className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 place-items-center"
          >
            {teamMembers
              .filter(
                (member: { role: string }) =>
                  member.role === "Organizing Team Member"
              )
              .map(
                (member: {
                  batch:
                    | string
                    | number
                    | boolean
                    | ReactElement<any, string | JSXElementConstructor<any>>
                    | Iterable<ReactNode>
                    | PromiseLikeOfReactNode
                    | null
                    | undefined;
                  emailID:
                    | boolean
                    | ReactElement<any, string | JSXElementConstructor<any>>
                    | Iterable<ReactNode>
                    | PromiseLikeOfReactNode
                    | Key
                    | null
                    | undefined;
                  imageURL: string | undefined;
                  name:
                    | string
                    | number
                    | boolean
                    | ReactElement<any, string | JSXElementConstructor<any>>
                    | Iterable<ReactNode>
                    | PromiseLikeOfReactNode
                    | null
                    | undefined;
                }) => (
                  <div
                    key={member.emailID ? String(member.emailID) : undefined}
                  >
                    <div className="h-48 w-48 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl relative">
                      {member.imageURL && (
                        <img
                          src={member.imageURL}
                          alt={member.name?.toString() ?? ""}
                          className="object-cover h-full w-full rounded-3xl"
                        />
                      )}
                      <div className="flex flex-col justify-between p-5 absolute opacity-0 top-0 left-0 h-full w-full fd-sh hover:opacity-100 transition-all bg-black bg-opacity-75 rounded-3xl">
                        <h2 className="text-xl font-semibold break-all text-wrap">
                          {String(member.batch)}
                        </h2>
                        <div>
                          <a
                            href={`mailto:${member.emailID}`}
                            className="font-mono break-all text-wrap"
                          >
                            <p>{String(member.emailID).split("@")[0]}</p>
                            <p>@{String(member.emailID).split("@")[1]}</p>
                          </a>
                        </div>
                      </div>
                    </div>
                    <div className="uppercase font-semibold py-4">
                      {member.name}
                    </div>
                  </div>
                )
              )}
          </div>
        </div>
        <div className="w-full md:flex md:flex-row justify-around py-20 align-middle">
          <div className="bg-gradient-to-r from-emerald-500 to-teal-400 rounded-b-3xl m-10 inline-flex md:hidden flex-col items-center justify-center h-32 w-5/6">
            <h2 className="uppercase font-extrabold text-6xl">Tech</h2>
            <h3 className="uppercase font-bold text-xl">& Events</h3>
          </div>
          <div
            // className={`grid grid-cols-1 gap-5 md:grid-cols-${Math.min(
            //   2,
            //   numMembersTech
            // )} lg:grid-cols-${Math.min(
            //   3,
            //   numMembersTech
            // )} xl:grid-cols-${Math.min(
            //   4,
            //   numMembersTech
            // )} 2xl:grid-cols-${Math.min(5, numMembersTech)} place-items-center`}
            className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 place-items-center"
          >
            {teamMembers
              .filter(
                (member: { role: string }) =>
                  member.role === "Tech/Events Team Member"
              )
              .map(
                (member: {
                  batch:
                    | string
                    | number
                    | boolean
                    | ReactElement<any, string | JSXElementConstructor<any>>
                    | Iterable<ReactNode>
                    | PromiseLikeOfReactNode
                    | null
                    | undefined;
                  emailID:
                    | boolean
                    | ReactElement<any, string | JSXElementConstructor<any>>
                    | Iterable<ReactNode>
                    | PromiseLikeOfReactNode
                    | Key
                    | null
                    | undefined;
                  imageURL: string | undefined;
                  name:
                    | string
                    | number
                    | boolean
                    | ReactElement<any, string | JSXElementConstructor<any>>
                    | Iterable<ReactNode>
                    | PromiseLikeOfReactNode
                    | null
                    | undefined;
                }) => (
                  <div
                    key={member.emailID ? String(member.emailID) : undefined}
                  >
                    <div className="h-48 w-48 bg-gradient-to-r from-emerald-500 to-teal-400 rounded-3xl relative">
                      {member.imageURL && (
                        <img
                          src={member.imageURL}
                          alt={member.name?.toString() ?? ""}
                          className="object-cover h-full w-full rounded-3xl"
                        />
                      )}
                      <div className="flex flex-col justify-between p-5 absolute opacity-0 top-0 left-0 h-full w-full fd-sh hover:opacity-100 transition-all bg-black bg-opacity-75 rounded-3xl">
                        <h2 className="text-xl font-semibold break-all text-wrap">
                          {String(member.batch)}
                        </h2>
                        <div>
                          <a
                            href={`mailto:${member.emailID}`}
                            className="font-mono break-all text-wrap"
                          >
                            <p>{String(member.emailID).split("@")[0]}</p>
                            <p>@{String(member.emailID).split("@")[1]}</p>
                          </a>
                        </div>
                      </div>
                    </div>
                    <div className="uppercase font-semibold py-4">
                      {member.name}
                    </div>
                  </div>
                )
              )}
          </div>
          <div className="hidden bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full m-10 md:inline-flex flex-col items-center justify-center h-64 w-64">
            <h2 className="uppercase font-extrabold text-6xl">Tech</h2>
            <h3 className="uppercase font-bold text-xl">& Events</h3>
          </div>
        </div>
        <div className="w-full md:flex md:flex-row justify-around py-20 align-middle">
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-b-3xl m-10 inline-flex md:hidden flex-col items-center justify-center h-32 w-5/6">
            <h2 className="uppercase font-extrabold text-6xl">Corp.</h2>
            <h3 className="uppercase font-bold text-xl">& Outreach</h3>
          </div>
          <div className="hidden bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full m-10 md:inline-flex flex-col items-center justify-center h-64 w-64">
            <h2 className="uppercase font-extrabold text-6xl">Corp.</h2>
            <h3 className="uppercase font-bold text-xl">& Outreach</h3>
          </div>
          <div
            // className={`grid grid-cols-1 gap-5 md:grid-cols-${Math.min(
            //   2,
            //   numMembersCorp
            // )} lg:grid-cols-${Math.min(
            //   3,
            //   numMembersCorp
            // )} xl:grid-cols-${Math.min(
            //   4,
            //   numMembersCorp
            // )} 2xl:grid-cols-${Math.min(5, numMembersCorp)} place-items-center`}
            className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 place-items-center"
          >
            {teamMembers
              .filter(
                (member: { role: string }) =>
                  member.role === "Corporate/Outreach Team Member"
              )
              .map(
                (member: {
                  batch:
                    | string
                    | number
                    | boolean
                    | ReactElement<any, string | JSXElementConstructor<any>>
                    | Iterable<ReactNode>
                    | PromiseLikeOfReactNode
                    | null
                    | undefined;
                  emailID:
                    | boolean
                    | ReactElement<any, string | JSXElementConstructor<any>>
                    | Iterable<ReactNode>
                    | PromiseLikeOfReactNode
                    | Key
                    | null
                    | undefined;
                  imageURL: string | undefined;
                  name:
                    | string
                    | number
                    | boolean
                    | ReactElement<any, string | JSXElementConstructor<any>>
                    | Iterable<ReactNode>
                    | PromiseLikeOfReactNode
                    | null
                    | undefined;
                }) => (
                  <div
                    key={member.emailID ? String(member.emailID) : undefined}
                  >
                    <div className="h-48 w-48 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl relative">
                      {member.imageURL && (
                        <img
                          src={member.imageURL}
                          alt={member.name?.toString() ?? ""}
                          className="object-cover h-full w-full rounded-3xl"
                        />
                      )}
                      <div className="flex flex-col justify-between p-5 absolute opacity-0 top-0 left-0 h-full w-full fd-sh hover:opacity-100 transition-all bg-black bg-opacity-75 rounded-3xl">
                        <h2 className="text-xl font-semibold break-all text-wrap">
                          {String(member.batch)}
                        </h2>
                        <div>
                          <a
                            href={`mailto:${member.emailID}`}
                            className="font-mono break-all text-wrap"
                          >
                            <p>{String(member.emailID).split("@")[0]}</p>
                            <p>@{String(member.emailID).split("@")[1]}</p>
                          </a>
                        </div>
                      </div>
                    </div>
                    <div className="uppercase font-semibold py-4">
                      {member.name}
                    </div>
                  </div>
                )
              )}
          </div>
        </div>
        <div className="w-full md:flex md:flex-row justify-around py-20 align-middle">
          <div className="bg-gradient-to-r from-emerald-500 to-teal-400 rounded-b-3xl m-10 inline-flex md:hidden flex-col items-center justify-center h-32 w-5/6">
            <h2 className="uppercase font-extrabold text-6xl">Design</h2>
            <h3 className="uppercase font-bold text-xl">Team</h3>
          </div>
          <div
            // className={`grid grid-cols-1 gap-5 md:grid-cols-${Math.min(
            //   2,
            //   numMembersDesign
            // )} lg:grid-cols-${Math.min(
            //   3,
            //   numMembersDesign
            // )} xl:grid-cols-${Math.min(
            //   4,
            //   numMembersDesign
            // )} 2xl:grid-cols-${Math.min(
            //   5,
            //   numMembersDesign
            // )} place-items-center`}
            className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 place-items-center"
          >
            {teamMembers
              .filter(
                (member: { role: string }) =>
                  member.role === "Design Team Member"
              )
              .map(
                (member: {
                  batch:
                    | string
                    | number
                    | boolean
                    | ReactElement<any, string | JSXElementConstructor<any>>
                    | Iterable<ReactNode>
                    | PromiseLikeOfReactNode
                    | null
                    | undefined;
                  emailID:
                    | boolean
                    | ReactElement<any, string | JSXElementConstructor<any>>
                    | Iterable<ReactNode>
                    | PromiseLikeOfReactNode
                    | Key
                    | null
                    | undefined;
                  imageURL: string | undefined;
                  name:
                    | string
                    | number
                    | boolean
                    | ReactElement<any, string | JSXElementConstructor<any>>
                    | Iterable<ReactNode>
                    | PromiseLikeOfReactNode
                    | null
                    | undefined;
                }) => (
                  <div
                    key={member.emailID ? String(member.emailID) : undefined}
                  >
                    <div className="h-48 w-48 bg-gradient-to-r from-emerald-500 to-teal-400 rounded-3xl relative">
                      {member.imageURL && (
                        <img
                          src={member.imageURL}
                          alt={member.name?.toString() ?? ""}
                          className="object-cover h-full w-full rounded-3xl"
                        />
                      )}
                      <div className="flex flex-col justify-between p-5 absolute opacity-0 top-0 left-0 h-full w-full fd-sh hover:opacity-100 transition-all bg-black bg-opacity-75 rounded-3xl">
                        <h2 className="text-xl font-semibold break-all text-wrap">
                          {String(member.batch)}
                        </h2>
                        <div>
                          <a
                            href={`mailto:${member.emailID}`}
                            className="font-mono break-all text-wrap"
                          >
                            <p>{String(member.emailID).split("@")[0]}</p>
                            <p>@{String(member.emailID).split("@")[1]}</p>
                          </a>
                        </div>
                      </div>
                    </div>
                    <div className="uppercase font-semibold py-4">
                      {member.name}
                    </div>
                  </div>
                )
              )}
          </div>
          <div className="hidden bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full m-10 md:inline-flex flex-col items-center justify-center h-64 w-64">
            <h2 className="uppercase font-extrabold text-6xl">Design</h2>
            <h3 className="uppercase font-bold text-xl">Team</h3>
          </div>
        </div>
      </div>
    </main>
  );
}
