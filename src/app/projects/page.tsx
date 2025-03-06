"use client";
import { useEffect, useState, useRef } from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { motion } from "framer-motion";
import "/styles/projects.css";
import projectsData from "@/data/projects.json";
import carouselProjectNames from "@/data/carouselProjects.json";
import membersData from "@/data/members.json";
import brandLogo from "@/assets/BrandLogo.png";
import Image from "next/image";

export default function Projects({ searchParams }: { searchParams: any }) {
  const [activeTab, setActiveTab] = useState(searchParams.activeTab || "All");
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);

  const filteredProjects =
    activeTab === "All"
      ? projectsData
      : projectsData.filter((project) => project.category === activeTab);

  const carouselProjectData = projectsData.filter(({ projectName }) =>
    carouselProjectNames.includes(projectName)
  );

  const changeCarouselIndex = (index: number) => {
    if (isAnimating) return;

    setIsAnimating(true);
    setCarouselIndex(index);

    setTimeout(() => {
      setIsAnimating(false);
    }, 600);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCarouselIndex(
        (carouselIndex) => (carouselIndex + 1) % carouselProjectData.length
      );
    }, 10000);
    return () => clearInterval(interval);
  }, [carouselProjectData.length]);

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <main className="bg-gradient-to-b from-[#11101f] to-[#190e36] min-h-[100vh] flex flex-col justify-center items-center">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        transition={{ duration: 0.8 }}
        className="bg-gradient-to-r from-[#211248] to-[#2d1a5a] text-white lg:h-[60vh] px-5 lg:p-10 m-10 lg:m-20 rounded-3xl w-screen flex flex-col justify-center max-w-[80vw] shadow-2xl shadow-purple-900/30 backdrop-blur-sm"
      >
        <motion.div
          className="flex flex-col lg:flex-row items-center justify-start h-full align-middle"
          ref={carouselRef}
        >
          <motion.div
            key={`carousel-image-${carouselIndex}`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="hidden mx-5 lg:flex lg:items-center h-[90%] w-[30%] rounded-3xl relative shrink-0 overflow-hidden shadow-xl"
            style={{
              backgroundImage: `url(${carouselProjectData[carouselIndex].image
                  ? carouselProjectData[carouselIndex].image
                  : "https://clubs.iiit.ac.in/_next/image?url=http%3A%2F%2Ffiles%2Ffiles%2Fdownload%3Ffilename%3D572YeG2MbymmpyV5b8MQJh_osdg.png&w=384&q=75"
                })`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60"></div>
          </motion.div>
          <motion.div
            key={`carousel-content-${carouselIndex}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="hidden lg:flex lg:ml-10 lg:flex-col justify-around lg:px-10 h-full"
          >
            <h2 className="lg:text-5xl font-semibold text-wrap bg-gradient-to-r from-white to-purple-300 bg-clip-text text-transparent">
              {carouselProjectData[carouselIndex].projectName}
            </h2>
            <div className="max-w-[50vw] lg:mx--10 lg:mt-5 text-justify text-white/90 leading-relaxed">
              {carouselProjectData[carouselIndex].description}
            </div>
            <div className="flex justify-center lg:justify-start flex-wrap lg:text-lg italic text-purple-200">
              Maintained by&nbsp;
              {carouselProjectData[carouselIndex].maintainers
                .slice(0, -1)
                .map((maintainer) => maintainer)
                .join(", ")}
              {carouselProjectData[carouselIndex].maintainers.length > 1
                ? " and " +
                carouselProjectData[carouselIndex].maintainers[
                carouselProjectData[carouselIndex].maintainers.length - 1
                ]
                : carouselProjectData[carouselIndex].maintainers[0]}
            </div>
            <div className="flex items-center">
              <a href={carouselProjectData[carouselIndex].link} className="group">
                <div className="bg-gradient-to-r from-[#5e18eb] to-[#7841f5] max-w-[12vw] font-semibold rounded-full p-4 flex justify-center items-center select-none cursor-pointer transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/40 group-hover:scale-105">
                  View Project
                </div>
              </a>
              <div className="flex gap-2 mx-10 flex-wrap select-none">
                {carouselProjectData[carouselIndex].maintainers.map(
                  (maintainer, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: 0.1 * index }}
                      whileHover={{ scale: 1.1 }}
                      className="relative"
                    >
                      <Image
                        width="80"
                        height="80"
                        src={
                          membersData.find(({ name }) => name === maintainer)!
                            .imageURL
                        }
                        alt={maintainer}
                        className="object-cover h-16 w-16 rounded-full m-3 border-2 border-purple-400 shadow-md shadow-purple-500/50"
                      />
                      <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-purple-900/80 px-2 py-0.5 rounded-full text-xs opacity-0 transition-opacity group-hover:opacity-100">
                        {maintainer}
                      </div>
                    </motion.div>
                  )
                )}
              </div>
            </div>
          </motion.div>

          <motion.div
            key={`mobile-carousel-image-${carouselIndex}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="flex lg:hidden items-start justify-start h-[25vh] w-[25vh] lg:h-48 lg:w-48 bg-gradient-to-br from-[#02b5ff] to-[#5c1aeb] rounded-3xl relative mt-10 shadow-lg overflow-hidden"
            style={{
              backgroundImage: `url(${carouselProjectData[carouselIndex].image
                  ? carouselProjectData[carouselIndex].image
                  : "https://clubs.iiit.ac.in/_next/image?url=http%3A%2F%2Ffiles%2Ffiles%2Fdownload%3Ffilename%3D572YeG2MbymmpyV5b8MQJh_osdg.png&w=384&q=75"
                })`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60"></div>
          </motion.div>
          <motion.div
            key={`mobile-carousel-content-${carouselIndex}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex lg:hidden mt-6 items-center justify-center flex-col"
          >
            <h2 className="text-4xl font-semibold text-wrap text-center bg-gradient-to-r from-white to-purple-300 bg-clip-text text-transparent">
              {carouselProjectData[carouselIndex].projectName}
            </h2>
            <div className="text-sm m-5 text-justify text-white/90 leading-relaxed">
              {carouselProjectData[carouselIndex].description}
            </div>
            <div className="flex items-center mx-5 mb-5">
              <a href={carouselProjectData[carouselIndex].link}>
                <div className="bg-gradient-to-r from-[#5e18eb] to-[#7841f5] max-w-[40vw] font-semibold rounded-full p-4 flex justify-center items-center select-none cursor-pointer shrink-0 hover:shadow-lg hover:shadow-purple-500/40 transition-all duration-300">
                  View Project
                </div>
              </a>
            </div>
            <div className="flex justify-center flex-wrap italic px-5 text-center text-purple-200">
              Maintained by&nbsp;
              {carouselProjectData[carouselIndex].maintainers
                .slice(0, -1)
                .map((maintainer) => maintainer)
                .join(", ")}
              {carouselProjectData[carouselIndex].maintainers.length > 1
                ? " and " +
                carouselProjectData[carouselIndex].maintainers[
                carouselProjectData[carouselIndex].maintainers.length - 1
                ]
                : carouselProjectData[carouselIndex].maintainers[0]}
            </div>
            <div className="flex gap-2 mx-10 mb-10 mt-5 flex-wrap justify-center">
              {carouselProjectData[carouselIndex].maintainers.map(
                (maintainer, index) => (
                  <Image
                    width="80"
                    height="80"
                    key={index}
                    src={
                      membersData.find(({ name }) => name === maintainer)!
                        .imageURL
                    }
                    alt={maintainer}
                    className="object-cover h-12 w-12 rounded-full m-3 border-2 border-purple-400 shadow-md"
                  />
                )
              )}
            </div>
            <div>
              <div className="flex justify-center items-center gap-3 p-10">
                {carouselProjectData.map((project, index) => {
                  return (
                    <motion.div
                      key={project.projectName}
                      className={`h-3 ${index === carouselIndex ? 'w-6' : 'w-3'} rounded-full cursor-pointer transition-all duration-300 ${index === carouselIndex ? "bg-purple-400" : "bg-white/50"
                        }`}
                      whileHover={{ scale: 1.2 }}
                      onClick={() => changeCarouselIndex(index)}
                    ></motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="hidden lg:flex gap-5 place-items-center flex-wrap w-[80vw] align-middle justify-center mb-10 select-none"
      >
        {carouselProjectData.map((project, index) => {
          return (
            <motion.div
              key={index}
              className={`h-24 w-28 lg:h-36 lg:w-56 relative m-5 cursor-pointer ${index === carouselIndex ? "opacity-100" : "opacity-50"
                }`}
              whileHover={{ scale: 1.05, opacity: 1 }}
              transition={{ type: "spring", stiffness: 300 }}
              onClick={() => changeCarouselIndex(index)}
            >
              <div
                className={`absolute inset-0 rounded-3xl shadow-lg ${index === carouselIndex ? "ring-2 ring-purple-400" : ""
                  }`}
                style={{
                  backgroundImage: `url(${project.image
                      ? project.image
                      : "https://clubs.iiit.ac.in/_next/image?url=http%3A%2F%2Ffiles%2Ffiles%2Fdownload%3Ffilename%3D572YeG2MbymmpyV5b8MQJh_osdg.png&w=384&q=75"
                    })`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  filter: index === carouselIndex ? "blur(5px)" : "none",
                }}
              ></div>
              <div
                className={`flex flex-col justify-center items-center p-5 absolute top-0 left-0 h-full w-full fd-sh hover:opacity-100 transition-all bg-black bg-opacity-40 rounded-3xl ${index === carouselIndex ? "opacity-100" : "opacity-0"
                  }`}
              >
                <h2 className="text-xl font-semibold text-white text-center shadow-text">
                  {project.projectName}
                </h2>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="flex flex-col w-full pl-8 lg:pl-16"
      >
        <h2 className="my-5 mx-0 text-3xl lg:text-5xl font-semibold break-all text-white">
          <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">Projects Panel</span>
        </h2>
        <div className="flex flex-row justify-start">
          <motion.div
            className={`flex md:flex-row flex-col justify-center items-center h-10 w-28 ${activeTab === "All"
                ? "bg-gradient-to-r from-[#4f15c2] to-[#6929e8]"
                : "bg-[#322455] hover:bg-[#3d2b69]"
              } rounded-full relative mx-2 mb-5 text-white cursor-pointer select-none transition-colors duration-300`}
            onClick={() => setActiveTab("All")}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            All
          </motion.div>
          <motion.div
            className={`flex md:flex-row flex-col justify-center items-center h-10 w-28 ${activeTab === "OSDG"
                ? "bg-gradient-to-r from-[#4f15c2] to-[#6929e8]"
                : "bg-[#322455] hover:bg-[#3d2b69]"
              } rounded-full relative mx-2 mb-5 text-white select-none cursor-pointer transition-colors duration-300`}
            onClick={() => setActiveTab("OSDG")}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            OSDG
          </motion.div>
          <motion.div
            className={`flex md:flex-row flex-col justify-center items-center h-10 w-28 ${activeTab === "Individual"
                ? "bg-gradient-to-r from-[#4f15c2] to-[#6929e8]"
                : "bg-[#322455] hover:bg-[#3d2b69]"
              } rounded-full relative mx-2 mb-5 text-white select-none cursor-pointer transition-colors duration-300`}
            onClick={() => setActiveTab("Individual")}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Individual
          </motion.div>
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="w-full"
      >
        <div className="flex flex-wrap mb-5 w-full">
          <TransitionGroup className="flex flex-wrap mb-5 mx-5 lg:px-5 w-full">
            {filteredProjects.map((project, index) => {
              return (
                <CSSTransition key={index} timeout={500} classNames="item">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ y: -5, transition: { duration: 0.2 } }}
                    className="w-full md:w-[44.5%] lg:w-[29.1%] xl:w-[21.5%] bg-gradient-to-br from-[#2a284b] to-[#342b5e] rounded-xl m-5 flex flex-col justify-between shadow-xl hover:shadow-purple-500/20 transition-all duration-300"
                  >
                    <div className="flex items-center p-2 w-full">
                      <div className="relative overflow-hidden h-24 w-24 rounded-xl shrink-0 m-2.5">
                        <Image
                          src={
                            project.image
                              ? project.image
                              : "https://clubs.iiit.ac.in/_next/image?url=http%3A%2F%2Ffiles%2Ffiles%2Fdownload%3Ffilename%3D572YeG2MbymmpyV5b8MQJh_osdg.png&w=384&q=75"
                          }
                          width="80"
                          height="80"
                          alt={project.projectName}
                          className="object-cover h-24 w-24 rounded-xl shrink-0 transition-transform duration-300 hover:scale-110"
                        />
                      </div>
                      <div className="flex flex-col justify-center ml-5 shrink">
                        <h2 className="text-2xl font-semibold text-white mt-3 mb-2">
                          {project.projectName}
                        </h2>
                        <div className="flex flex-wrap mb-3">
                          {project.technologies &&
                            project.technologies
                              .slice(0, 4)
                              .map((language, index_technologies) => (
                                <motion.div
                                  key={index_technologies}
                                  className="flex justify-center items-center px-2 m-1 h-6 w-min bg-gradient-to-r from-[#5e18eb] to-[#7841f5] rounded-full relative my-1 text-white text-[0.65rem] font-bold select-none"
                                  whileHover={{ scale: 1.1 }}
                                >
                                  {language}
                                </motion.div>
                              ))}
                          {project.technologies &&
                            project.technologies.length > 4 && (
                              <motion.div
                                className="flex justify-center items-center px-2 m-1 h-6 w-min bg-gradient-to-r from-[#4b2599] to-[#6037c3] rounded-full relative my-1 text-white text-[0.65rem] font-bold select-none"
                                whileHover={{ scale: 1.1 }}
                              >
                                +{project.technologies.length - 4}
                              </motion.div>
                            )}
                        </div>
                      </div>
                    </div>
                    <div className="px-5 mb-2 w-full text-[#cbb3fa] italic text-xs group">
                      <a
                        href={project.link}
                        className="hover:text-purple-300 transition-colors duration-200 font-semibold text-wrap break-all flex items-center"
                      >
                        <span className="underline">{project.link}</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    </div>
                    <div className="mx-5 text-white/90 text-s text-justify leading-relaxed">
                      {project.description}
                    </div>
                    {project.category === "OSDG" && (
                      <div className="flex gap-2 m-5 justify-start items-center w-5/6 leading-5 bg-purple-900/20 p-3 rounded-lg">
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
                      <div className="flex gap-2 m-5 justify-start items-center w-2/3 leading-5 bg-purple-900/20 p-3 rounded-lg">
                        <motion.div whileHover={{ scale: 1.1 }} className="relative">
                          <Image
                            width="80"
                            height="80"
                            src={
                              membersData.find(
                                ({ name }) => name === project.maintainers[0]
                              )!.imageURL
                            }
                            alt={project.maintainers[0]}
                            className="object-cover h-14 w-14 rounded-full shrink-0 select-none border-2 border-purple-400"
                          />
                        </motion.div>
                        <div className="text-l font-semibold text-white">
                          {project.maintainers[0]}
                        </div>
                      </div>
                    )}
                  </motion.div>
                </CSSTransition>
              );
            })}
          </TransitionGroup>
        </div>
      </motion.div>
    </main>
  );
}
