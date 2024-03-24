"use client";
import { useEffect, useState } from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import "/styles/projects.css";
import projectsData from "@/data/projects.json";
import carouselProjectData from "@/data/carouselProjects.json";
import brandLogo from "@/assets/BrandLogo.png";
import Image from "next/image";

export default function Projects({ searchParams }: { searchParams: any }) {
  const [activeTab, setActiveTab] = useState(searchParams.activeTab || "All");
  const [carouselIndex, setCarouselIndex] = useState(0);

  const filteredProjects =
    activeTab === "All"
      ? projectsData
      : projectsData.filter((project) => project.category === activeTab);

  useEffect(() => {
    const interval = setInterval(() => {
      setCarouselIndex(
        (carouselIndex) => (carouselIndex + 1) % carouselProjectData.length
      );
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="bg-[#11101f] min-h-[100vh] flex flex-col justify-center items-center">
      <div className="bg-[#211248] text-white lg:h-[60vh] px-5 lg:p-10 m-10 lg:m-20 rounded-3xl w-screen flex flex-col justify-center max-w-[80vw]">
        <div className="flex flex-col lg:flex-row items-center justify-start h-full align-middle">
          <div
            className="hidden mx-5 lg:flex lg:items-center h-[90%] w-[30%] rounded-3xl relative shrink-0"
            style={{
              backgroundImage: `url(${
                carouselProjectData[carouselIndex].image
                  ? carouselProjectData[carouselIndex].image
                  : "https://clubs.iiit.ac.in/_next/image?url=http%3A%2F%2Ffiles%2Ffiles%2Fdownload%3Ffilename%3D572YeG2MbymmpyV5b8MQJh_osdg.png&w=384&q=75"
              })`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          ></div>
          <div className="hidden lg:flex lg:ml-10 lg:flex-col justify-around lg:px-10 h-full">
            <h2 className="lg:text-5xl font-semibold text-wrap">
              {carouselProjectData[carouselIndex].projectName}
            </h2>
            <div className="max-w-[50vw] lg:mx--10 lg:mt-5 text-justify">
              {carouselProjectData[carouselIndex].description}
            </div>
            <div className="flex justify-center lg:justify-start flex-wrap lg:text-lg italic">
              Maintained by&nbsp;
              {carouselProjectData[carouselIndex].maintainers
                .slice(0, -1)
                .map((maintainer) => maintainer.name)
                .join(", ")}
              {carouselProjectData[carouselIndex].maintainers.length > 1
                ? " and " +
                  carouselProjectData[carouselIndex].maintainers[
                    carouselProjectData[carouselIndex].maintainers.length - 1
                  ].name
                : carouselProjectData[carouselIndex].maintainers[0].name}
            </div>
            <div className="flex items-center">
              <a href={carouselProjectData[carouselIndex].link}>
                <div className="bg-[#5e18eb] max-w-[10vw] font-semibold rounded-3xl p-5 flex justify-center items-center select-none cursor-pointer">
                  View Project
                </div>
              </a>
              <div className="flex gap-2 mx-10 flex-wrap select-none">
                {carouselProjectData[carouselIndex].maintainers.map(
                  (maintainer, index) => (
                    <Image
                      width="80"
                      height="80"
                      key={index}
                      src={
                        maintainer.pfpURL
                          ? maintainer.pfpURL
                          : `https://robohash.org/${maintainer.name}.png?set=set5`
                      }
                      alt={maintainer.name}
                      className="object-cover h-16 w-16 bg-red-300 rounded-full m-3"
                    />
                  )
                )}
              </div>
            </div>
          </div>

          <div
            className="flex lg:hidden items-start justify-start h-[25vh] w-[25vh] lg:h-48 lg:w-48 bg-gradient-to-br from-[#02b5ff] to-[#5c1aeb] rounded-3xl relative mt-10"
            style={{
              backgroundImage: `url(${
                carouselProjectData[carouselIndex].image
                  ? carouselProjectData[carouselIndex].image
                  : "https://clubs.iiit.ac.in/_next/image?url=http%3A%2F%2Ffiles%2Ffiles%2Fdownload%3Ffilename%3D572YeG2MbymmpyV5b8MQJh_osdg.png&w=384&q=75"
              })`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          ></div>
          <div className="flex lg:hidden mt-6 items-center justify-center flex-col">
            <h2 className="text-4xl font-semibold text-wrap text-center">
              {carouselProjectData[carouselIndex].projectName}
            </h2>
            <div className="text-sm m-5 text-justify">
              {carouselProjectData[carouselIndex].description}
            </div>
            <div className="flex items-center mx-5 mb-5">
              <a href={carouselProjectData[carouselIndex].link}>
                <div className="bg-[#5e18eb] max-w-[40vw] font-semibold rounded-3xl p-5 flex justify-center items-center select-none cursor-pointer shrink-0">
                  View Project
                </div>
              </a>
            </div>
            <div className="flex justify-center flex-wrap italic px-5 text-center">
              Maintained by&nbsp;
              {carouselProjectData[carouselIndex].maintainers
                .slice(0, -1)
                .map((maintainer) => maintainer.name)
                .join(", ")}
              {carouselProjectData[carouselIndex].maintainers.length > 1
                ? " and " +
                  carouselProjectData[carouselIndex].maintainers[
                    carouselProjectData[carouselIndex].maintainers.length - 1
                  ].name
                : carouselProjectData[carouselIndex].maintainers[0].name}
            </div>
            <div className="flex gap-2 mx-10 mb-10 mt-5 flex-wrap justify-center">
              {carouselProjectData[carouselIndex].maintainers.map(
                (maintainer, index) => (
                  <Image
                    width="80"
                    height="80"
                    key={index}
                    src={
                      maintainer.pfpURL
                        ? maintainer.pfpURL
                        : `https://robohash.org/${maintainer.name}.png?set=set5`
                    }
                    alt={maintainer.name}
                    className="object-cover h-12 w-12 bg-red-300 rounded-full m-3"
                  />
                )
              )}
            </div>
            <div>
              <div className="flex justify-center items-center gap-3 p-10">
                {carouselProjectData.map((project, index) => {
                  return (
                    <div
                      key={index}
                      className={`h-2 w-2 rounded-full bg-white cursor-pointer ${
                        index === carouselIndex ? "opacity-100" : "opacity-50"
                      }`}
                      onClick={() => setCarouselIndex(index)}
                    ></div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="hidden lg:flex gap-5 place-items-center flex-wrap w-[80vw] align-middle justify-center mb-10 select-none">
        {carouselProjectData.map((project, index) => {
          return (
            <div
              key={index}
              className={`h-24 w-28 lg:h-36 lg:w-56 relative m-5 cursor-pointer ${
                index === carouselIndex ? "opacity-100" : "opacity-50"
              }`}
              onClick={() => setCarouselIndex(index)}
            >
              <div
                className={`absolute inset-0 rounded-3xl`}
                style={{
                  backgroundImage: `url(${
                    project.image
                      ? project.image
                      : "https://clubs.iiit.ac.in/_next/image?url=http%3A%2F%2Ffiles%2Ffiles%2Fdownload%3Ffilename%3D572YeG2MbymmpyV5b8MQJh_osdg.png&w=384&q=75"
                  })`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  filter: index === carouselIndex ? "blur(5px)" : "none",
                }}
              ></div>
              <div
                className={`flex flex-col justify-center items-center p-5 absolute top-0 left-0 h-full w-full fd-sh hover:opacity-100 transition-all bg-opacity-0 rounded-3xl ${
                  index === carouselIndex ? "opacity-100" : "opacity-0"
                }`}
              >
                <h2 className="text-xl font-semibold text-white">
                  {project.projectName}
                </h2>
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex flex-col w-full pl-8 lg:pl-16">
        <h2 className="my-5 mx-0 text-3xl lg:text-5xl font-semibold break-all text-white">
          Projects Panel
        </h2>
        <div className="flex flex-row justify-start">
          <div
            className={`flex md:flex-row flex-col justify-center items-center h-8 w-24 bg-[#322455] hover:bg-[#4f15c2] rounded-md relative mx-1 mb-5 text-white cursor-pointer select-none ${
              activeTab === "All" ? "bg-[#4f15c2]" : ""
            }`}
            onClick={() => setActiveTab("All")}
          >
            All
          </div>
          <div
            className={`flex md:flex-row flex-col justify-center items-center h-8 w-24 bg-[#322455] hover:bg-[#4f15c2] rounded-md relative mx-1 mb-5 text-white select-none cursor-pointer ${
              activeTab === "OSDG" ? "bg-[#4f15c2]" : ""
            }`}
            onClick={() => setActiveTab("OSDG")}
          >
            OSDG
          </div>
          <div
            className={`flex md:flex-row flex-col justify-center items-center h-8 w-24 bg-[#322455] hover:bg-[#4f15c2] rounded-md relative mx-1 mb-5 text-white select-none cursor-pointer ${
              activeTab === "Individual" ? "bg-[#4f15c2]" : ""
            }`}
            onClick={() => setActiveTab("Individual")}
          >
            Individual
          </div>
        </div>
      </div>
      <div className="w-full">
        <div className="flex flex-wrap mb-5 w-full">
          <TransitionGroup className="flex flex-wrap mb-5 mx-5 lg:px-5 w-full">
            {filteredProjects.map((project, index) => {
              return (
                <CSSTransition key={index} timeout={500} classNames="item">
                  <div
                    key={index}
                    className="w-full md:w-[44.5%] lg:w-[29.1%] xl:w-[21.5%] bg-[#2a284b] rounded-xl m-5 flex flex-col justify-between"
                  >
                    <div className="flex items-center p-2 w-full">
                      <Image
                        src={
                          project.image
                            ? project.image
                            : "https://clubs.iiit.ac.in/_next/image?url=http%3A%2F%2Ffiles%2Ffiles%2Fdownload%3Ffilename%3D572YeG2MbymmpyV5b8MQJh_osdg.png&w=384&q=75"
                        }
                        width="80"
                        height="80"
                        alt={project.projectName}
                        className="object-cover h-24 w-24 rounded-xl shrink-0 m-2.5"
                      />
                      <div className="flex flex-col justify-center ml-5 shrink">
                        <h2 className="text-2xl font-semibold text-white mt-3 mb-2">
                          {project.projectName}
                        </h2>
                        <div className="flex flex-wrap mb-3">
                          {project.technologies &&
                            project.technologies
                              .slice(0, 4)
                              .map((language, index_technologies) => (
                                <div
                                  key={index_technologies}
                                  className="flex justify-center items-center p-1 m-1 h-6 w-min bg-[#5e18eb] rounded-md relative my-1 text-white text-[0.65rem] font-bold select-none"
                                >
                                  {language}
                                </div>
                              ))}
                          {project.technologies &&
                            project.technologies.length > 4 && (
                              <div className="flex justify-center items-center p-1 m-1 h-6 w-min bg-[#4b2599] rounded-md relative my-1 text-white text-[0.65rem] font-bold select-none">
                                +{project.technologies.length - 4}
                              </div>
                            )}
                        </div>
                      </div>
                    </div>
                    <div className="px-5 mb-2 w-full text-[#cbb3fa] italic underline text-xs">
                      <a
                        href={project.link}
                        className="hover:text-purple-400 transition-colors duration-200 font-semibold text-wrap break-all"
                      >
                        {project.link}
                      </a>
                    </div>
                    <div className="mx-5 text-white text-s text-justify">
                      {project.description}
                    </div>
                    {project.category === "OSDG" && (
                      <div className="flex gap-2 m-5 justify-start items-center w-5/6 leading-5">
                        <Image
                          width="80"
                          height="80"
                          src={brandLogo}
                          alt="OSDG"
                          className="object-contain h-14 w-20 rounded-full shrink-0 select-none"
                        />
                        <div className="text-l font-semibold text-white w-full">
                          Open Source Developers Group
                        </div>
                      </div>
                    )}
                    {project.category === "Individual" && (
                      <div className="flex gap-2 m-5 justify-start items-center w-2/3 leading-5">
                        <Image
                          width="80"
                          height="80"
                          src={
                            project.maintainers[0]["pfpURL"]
                              ? project.maintainers[0]["pfpURL"]
                              : `https://robohash.org/${project.maintainers[0]}.png?set=set5`
                          }
                          alt={project.projectName}
                          className="object-cover h-14 w-14 rounded-full shrink-0 select-none"
                        />
                        <div className="text-l font-semibold text-white">
                          {project.maintainers[0]["name"]}
                        </div>
                      </div>
                    )}
                  </div>
                </CSSTransition>
              );
            })}
          </TransitionGroup>
        </div>
      </div>
    </main>
  );
}
