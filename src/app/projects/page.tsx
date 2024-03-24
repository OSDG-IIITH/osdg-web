'use client';
import { useState } from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import '/styles/projects.css';
import projectsData from '../../../data/projects.json'

export default function Projects({ searchParams }) {
  const [activeTab, setActiveTab] = useState(searchParams.activeTab || 'All');

  const filteredProjects =
    activeTab === 'All'
      ? projectsData
      : projectsData.filter((project) => project.category === activeTab);

  return (
    <main className="bg-[#11101f] min-h-[100vh] flex flex-col justify-center items-center">
      <div className="bg-[#211248] text-white lg:h-[60vh] px-5 lg:p-20 m-10 lg:m-20 rounded-3xl w-screen flex flex-col justify-start max-w-[80vw]">
        <div className="flex flex-col lg:flex-row items-center justify-between lg:items-start">
          <div className="hidden lg:flex lg:items-center h-20 w-20 lg:h-48 lg:w-48 bg-gradient-to-br from-[#02b5ff] to-[#5c1aeb] rounded-3xl relative shrink-0">
            <div className="flex flex-col justify-between items-center p-5 absolute opacity-0 top-0 left-0 h-full w-full fd-sh hover:opacity-100 transition-all bg-black bg-opacity-75 rounded-3xl">
              <h2 className="text-xl font-semibold break-all text-white">
                Project Title
              </h2>
            </div>
          </div>
          <div className="hidden lg:flex lg:ml-4 flex flex-col justify-between lg:px-10">
            <h2 className="lg:text-5xl font-semibold break-all text-wrap">
              Project Title
            </h2>
            <div className="lg:text-sm max-w-[50vw] lg:mx--10 lg:mt-5">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur.
            </div>
            <div className="flex justify-center lg:justify-start">
              <span className="lg:text-lg italic my-10 mr-2">
                Maintained by
              </span>
              <span className="lg:text-lg italic font-semibold my-10">
                username
              </span>
            </div>
            <div className="flex items-center">
              <div className="bg-[#5e18eb] max-w-[10vw] font-semibold rounded-3xl p-5 flex justify-center items-center">
                View Project
              </div>
              <div className="flex gap-2 mx-10">
                <div className="h-20 w-20 bg-red-300 rounded-full"></div>
                <div className="h-20 w-20 bg-yellow-300 rounded-full"></div>
                <div className="h-20 w-20 bg-green-300 rounded-full"></div>
                <div className="h-20 w-20 bg-blue-300 rounded-full"></div>
              </div>
            </div>
          </div>
          <div className="flex lg:hidden items-start justify-start h-[25vh] w-[25vh] lg:h-48 lg:w-48 bg-gradient-to-br from-[#02b5ff] to-[#5c1aeb] rounded-3xl relative mt-10">
            <div className="flex flex-col justify-center items-center p-5 absolute opacity-0 top-0 left-0 h-full w-full fd-sh hover:opacity-100 transition-all bg-black bg-opacity-75 rounded-3xl">
              <h2 className="text-sm font-semibold break-all text-white">
                Project Title
              </h2>
            </div>
          </div>
          <div className="flex lg:hidden mt-4 items-center justify-center flex-col">
            <h2 className="text-2xl font-semibold break-all text-wrap text-center">
              Project Title
            </h2>
            <div className="text-sm">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur.
            </div>
            <div className="flex justify-center">
              <span className="text-lg italic my-10 mr-2"> Maintained by</span>
              <span className="text-lg italic font-semibold my-10">
                username
              </span>
            </div>
            <div className="flex items-center">
              <div className="bg-[#5e18eb] max-w-[40vw] font-semibold rounded-3xl p-5 flex justify-center items-center">
                View Project
              </div>
            </div>
            <div className="flex gap-2 mx-10 my-10">
              <div className="h-10 w-10 bg-red-300 rounded-full"></div>
              <div className="h-10 w-10 bg-yellow-300 rounded-full"></div>
              <div className="h-10 w-10 bg-green-300 rounded-full"></div>
              <div className="h-10 w-10 bg-blue-300 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 place-items-center">
        <div className="h-32 w-48 bg-gradient-to-br from-[#909fdf] to-[#5c1aeb] rounded-3xl relative m-5">
          <div className="flex flex-col justify-center items-center p-5 absolute opacity-0 top-0 left-0 h-full w-full fd-sh hover:opacity-100 transition-all bg-opacity-0 rounded-3xl">
            <h2 className="text-xl font-semibold break-all text-white">
              Project Title
            </h2>
          </div>
        </div>
        <div className=" h-32 w-48 bg-gradient-to-br from-[#909fdf] to-[#5c1aeb] rounded-3xl relative m-5">
          <div className="flex flex-col justify-center items-center p-5 absolute opacity-0 top-0 left-0 h-full w-full fd-sh hover:opacity-100 transition-all bg-opacity-0 rounded-3xl">
            <h2 className="text-xl font-semibold break-all text-white">
              Project Title
            </h2>
          </div>
        </div>
        <div className="h-32 w-48 bg-gradient-to-br from-[#909fdf] to-[#5c1aeb] rounded-3xl relative m-5">
          <div className="flex flex-col justify-center items-center p-5 absolute opacity-0 top-0 left-0 h-full w-full fd-sh hover:opacity-100 transition-all bg-opacity-0 rounded-3xl">
            <h2 className="text-xl font-semibold break-all text-white">
              Project Title
            </h2>
          </div>
        </div>
        <div className="h-32 w-48 bg-gradient-to-br from-[#909fdf] to-[#5c1aeb] rounded-3xl relative m-5">
          <div className="flex flex-col justify-center items-center p-5 absolute opacity-0 top-0 left-0 h-full w-full fd-sh hover:opacity-100 transition-all bg-opacity-0 rounded-3xl">
            <h2 className="text-xl font-semibold break-all text-white">
              Project Title
            </h2>
          </div>
        </div>
        <div className="h-32 w-48 bg-gradient-to-br from-[#909fdf] to-[#5c1aeb] rounded-3xl relative m-5">
          <div className="flex flex-col justify-center items-center p-5 absolute opacity-0 top-0 left-0 h-full w-full fd-sh hover:opacity-100 transition-all bg-opacity-0 rounded-3xl">
            <h2 className="text-xl font-semibold break-all text-white">
              Project Title
            </h2>
          </div>
        </div>
      </div>
      <div className="flex flex-col w-[90vw]">
        <h2 className="my-5 mx-0 text-3xl lg:text-5xl font-semibold break-all text-white">
          Projects Panel
        </h2>
        <div className="flex flex-row justify-start">
          <div
            className={`flex md:flex-row flex-col justify-center items-center h-8 w-24 bg-[#322455] hover:bg-[#4f15c2] rounded-md relative mx-1 mb-5 text-white cursor-pointer ${activeTab === 'All' ? 'bg-[#4f15c2]' : ''
              }`}
            onClick={() => setActiveTab('All')}
          >
            All
          </div>
          <div
            className={`flex md:flex-row flex-col justify-center items-center h-8 w-24 bg-[#322455] hover:bg-[#4f15c2] rounded-md relative mx-1 mb-5 text-white cursor-pointer ${activeTab === 'OSDG' ? 'bg-[#4f15c2]' : ''
              }`}
            onClick={() => setActiveTab('OSDG')}
          >
            OSDG
          </div>
          <div
            className={`flex md:flex-row flex-col justify-center items-center h-8 w-24 bg-[#322455] hover:bg-[#4f15c2] rounded-md relative mx-1 mb-5 text-white cursor-pointer ${activeTab === 'Individual' ? 'bg-[#4f15c2]' : ''
              }`}
            onClick={() => setActiveTab('Individual')}
          >
            Individual
          </div>
        </div>
      </div>
      <div>
        <div className="flex flex-wrap mb-5 mx-5">
          <TransitionGroup className="flex flex-wrap mb-5 mx-5">
            {filteredProjects.map((project, index) => (
              <CSSTransition
                key={index}
                timeout={500}
                classNames="item"
              >
                <div
                  key={index}
                  className="h-[350px] w-[370px] bg-[#2a284b] rounded-xl relative m-5 flex flex-col justify-between"
                >
                  <div className="flex items-center p-2 w-full">
                    <img src="https://clubs.iiit.ac.in/_next/image?url=http%3A%2F%2Ffiles%2Ffiles%2Fdownload%3Ffilename%3D572YeG2MbymmpyV5b8MQJh_osdg.png&w=384&q=75" className="object-cover h-24 w-24 bg-black rounded-xl shrink-0 m-2.5" />
                    <div className="flex flex-col justify-center ml-5 shrink">
                      <h2 className="text-3xl font-semibold text-white mt-3 mb-2">
                        {project.projectName}
                      </h2>
                      <div className="flex flex-wrap mb-3">
                        {project.technologies && project.technologies.map((language, index_technologies) => (
                          <div key={index_technologies} className="flex justify-center items-center p-1 m-1 h-6 w-min bg-[#5e18eb] rounded-md relative my-1 text-white text-[0.65rem] font-bold">
                            {language}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="mx-5 mb-2 w-full text-[#cbb3fa] italic underline text-s">
                    <a href={project.link} className="hover:text-purple-400 transition-colors duration-200 font-semibold">
                      {project.link}
                    </a>
                  </div>
                  <div className="mx-5 mx-2 text-white text-s">
                    {project.description}
                  </div>
                  {project.category === "OSDG" && (
                    <div className="flex gap-2 m-5 justify-start items-center w-2/3 leading-5">
                      <img src="https://clubs.iiit.ac.in/_next/image?url=http%3A%2F%2Ffiles%2Ffiles%2Fdownload%3Ffilename%3D572YeG2MbymmpyV5b8MQJh_osdg.png&w=384&q=75" className="object-cover h-14 w-14 bg-red-300 rounded-full shrink-0" />
                      <div className="text-l font-semibold text-white">
                        Open Source Developers Group
                      </div>
                    </div>
                  )}
                  {project.category === "Individual" && (
                    <div className="flex gap-2 m-5 justify-start items-center w-2/3 leading-5">
                      <img src={`https://robohash.org/${project.maintainers[0]}.png?set=set5`} className="object-cover h-14 w-14 bg-red-300 rounded-full shrink-0" />
                      <div className="text-l font-semibold text-white">
                        {project.maintainers[0]}
                      </div>
                    </div>
                  )}
                </div>
              </CSSTransition>
            ))}
          </TransitionGroup>
        </div>
      </div>
    </main>
  );
}