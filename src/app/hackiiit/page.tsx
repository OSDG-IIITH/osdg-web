"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { motion, useInView, useAnimation } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar, faClock, faMapMarkerAlt, faTrophy, faLaptopCode, faUsers, faCode, faBrain, faLightbulb, faCoffee, faPizzaSlice } from "@fortawesome/free-solid-svg-icons";
import hackathonGraphic from "@/assets/IntroGraphic.svg";

// Animation component for sections
const AnimatedSection = ({ children, delay = 0.2 }: { children: React.ReactNode; delay?: number }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.3 });
    const controls = useAnimation();

    useEffect(() => {
        if (isInView) {
            controls.start("visible");
        }
    }, [isInView, controls]);

    return (
        <motion.div
            ref={ref}
            initial="hidden"
            animate={controls}
            variants={{
                hidden: { opacity: 0, y: 50 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay } }
            }}
        >
            {children}
        </motion.div>
    );
};

// Custom hook for one-time animations
const useOneTimeAnimation = (amount = 0.3) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount });
    return { ref, isInView };
};

const CountdownTimer = () => {
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    });

    useEffect(() => {
        const hackathonDate = new Date("March 15, 2025 14:00:00 GMT+0530");
        const timer = setInterval(() => {
            const now = new Date();
            const difference = hackathonDate.getTime() - now.getTime();

            if (difference > 0) {
                setTimeLeft({
                    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                    minutes: Math.floor((difference / 1000 / 60) % 60),
                    seconds: Math.floor((difference / 1000) % 60),
                });
            } else {
                clearInterval(timer);
                setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
            }
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const timeBlocks = [
        { label: "Days", value: timeLeft.days },
        { label: "Hours", value: timeLeft.hours },
        { label: "Minutes", value: timeLeft.minutes },
        { label: "Seconds", value: timeLeft.seconds },
    ];

    return (
        <div className="flex justify-center gap-4 my-8">
            {timeBlocks.map((block, index) => (
                <motion.div
                    key={block.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="text-center p-4 bg-[#304154] rounded-lg w-24 shadow-lg backdrop-blur-sm bg-opacity-90"
                >
                    <div className="text-3xl font-bold">{block.value}</div>
                    <div className="text-sm opacity-80">{block.label}</div>
                </motion.div>
            ))}
        </div>
    );
};

// Track Illustration Component
const TrackIllustration = ({ isRegular }: { isRegular: boolean }) => {
    const { ref, isInView } = useOneTimeAnimation();

    return (
        <div className="relative w-full h-64 mb-6 overflow-hidden rounded-lg">
            {isRegular ? (
                // Regular Track Art
                <div className="w-full h-full bg-gradient-to-br from-blue-700 to-indigo-900 flex items-center justify-center p-4">
                    <div className="absolute inset-0 opacity-20">
                        {Array.from({ length: 15 }).map((_, i) => (
                            <div
                                key={i}
                                className="absolute rounded-full"
                                style={{
                                    width: `${Math.random() * 20 + 5}px`,
                                    height: `${Math.random() * 20 + 5}px`,
                                    backgroundColor: 'white',
                                    left: `${Math.random() * 100}%`,
                                    top: `${Math.random() * 100}%`,
                                    animation: `float ${Math.random() * 10 + 5}s linear infinite`,
                                }}
                            />
                        ))}
                    </div>
                    <motion.div
                        ref={ref}
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
                        transition={{ duration: 0.7 }}
                        className="text-center z-10"
                    >
                        <FontAwesomeIcon icon={faCode} className="text-7xl mb-4 text-white" />
                        <div className="text-white text-2xl font-bold">Regular Track</div>
                        <div className="text-blue-200 mt-2">Hosted by MontyCloud</div>
                        <div className="flex mt-4 gap-3 justify-center">
                            {Array.from({ length: 5 }).map((_, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ scale: 0 }}
                                    animate={isInView ? { scale: 1 } : { scale: 0 }}
                                    transition={{ delay: i * 0.1, duration: 0.4 }}
                                    className="w-8 h-8 rounded-full bg-white bg-opacity-20 flex items-center justify-center"
                                >
                                    <FontAwesomeIcon icon={faLaptopCode} className="text-white text-xs" />
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            ) : (
                // Beginners Track Art
                <div className="w-full h-full bg-gradient-to-br from-emerald-600 to-teal-800 flex items-center justify-center p-4">
                    <div className="absolute inset-0 opacity-20">
                        {Array.from({ length: 15 }).map((_, i) => (
                            <div
                                key={i}
                                className="absolute"
                                style={{
                                    width: `${Math.random() * 15 + 5}px`,
                                    height: `${Math.random() * 15 + 5}px`,
                                    backgroundColor: 'white',
                                    borderRadius: '2px',
                                    transform: `rotate(${Math.random() * 360}deg)`,
                                    left: `${Math.random() * 100}%`,
                                    top: `${Math.random() * 100}%`,
                                    animation: `pulse ${Math.random() * 5 + 2}s ease-in-out infinite alternate`,
                                }}
                            />
                        ))}
                    </div>
                    <motion.div
                        ref={ref}
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
                        transition={{ duration: 0.7 }}
                        className="text-center z-10"
                    >
                        <FontAwesomeIcon icon={faLightbulb} className="text-7xl mb-4 text-white" />
                        <div className="text-white text-2xl font-bold">Beginners Track</div>
                        <div className="text-emerald-200 mt-2">Hosted by Team OSDG</div>
                        <div className="flex mt-4 gap-2 justify-center">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={isInView ? { width: "80%" } : { width: 0 }}
                                transition={{ duration: 0.8, delay: 0.3 }}
                                className="h-2 rounded bg-white bg-opacity-30"
                            />
                        </div>
                    </motion.div>
                </div>
            )}
        </div>
    );
};

// Timeline Item Component with Animation
const TimelineItem = ({
    time,
    title,
    description,
    isLeft
}: {
    time: string;
    title: string;
    description: string;
    isLeft: boolean;
}) => {
    const { ref, isInView } = useOneTimeAnimation();

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col md:flex-row items-center mb-12"
        >
            <div className={`md:w-1/2 ${isLeft ? 'md:pr-8 md:text-right' : 'md:order-last md:pl-8'}`}>
                <motion.div
                    whileHover={{ y: -5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="bg-white p-6 rounded-lg shadow-lg"
                >
                    <h3 className="font-bold text-blue-600">{time}</h3>
                    <h4 className="text-lg font-bold">{title}</h4>
                    <p className="text-gray-600 mt-2">{description}</p>
                </motion.div>
            </div>

            {!isLeft && <div className="hidden md:block md:w-1/2"></div>}
        </motion.div>
    );
};

// Prize Item Component
const PrizeItem = ({ position, amount }: { position: string; amount: string; }) => (
    <motion.div
        whileHover={{ scale: 1.03 }}
        className="flex justify-between items-center border-b border-blue-200 py-3"
    >
        <span className="font-medium text-lg">{position}</span>
        <span className="font-bold text-lg text-white-700">{amount}</span>
    </motion.div>
);

// Participation Card Component
const ParticipationCard = ({ isSolo }: { isSolo: boolean }) => {
    const { ref, isInView } = useOneTimeAnimation();

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6 }}
            whileHover={{ scale: 1.05 }}
            // transition={{ type: "spring", stiffness: 300 }}
            className="bg-white rounded-xl shadow-xl overflow-hidden h-full flex flex-col"
        >
            <div className={`h-2 ${isSolo ? 'bg-indigo-600' : 'bg-purple-600'}`}></div>
            <div className="p-6 flex-grow flex flex-col">
                <div className="font-bold text-2xl mb-2">Participate {isSolo ? "Solo" : "in Teams"}</div>
                <div className="text-gray-700 flex-grow flex flex-col">
                    <p className="mb-4">{isSolo ?
                        "Show off your individual coding skills and problem-solving abilities." :
                        "Form teams of up to 5 members and collaborate on innovative solutions."
                    }</p>
                    <div className="flex justify-center my-3 flex-grow items-center">
                        {isSolo ? (
                            <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center">
                                <FontAwesomeIcon icon={faUsers} className="text-indigo-600 text-2xl" />
                            </div>
                        ) : (
                            <div className="flex gap-2">
                                {Array.from({ length: 5 }).map((_, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ scale: 0 }}
                                        animate={isInView ? { scale: 1 } : { scale: 0 }}
                                        transition={{ delay: i * 0.1, duration: 0.3 }}
                                        className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center"
                                    >
                                        <FontAwesomeIcon icon={faUsers} className="text-purple-600 text-xs" />
                                    </motion.div>
                                ))}
                            </div>
                        )}
                    </div>
                    <p className="text-sm mt-4">Note: {isSolo ? "Solo particpants must be available offline." : "At least one person from a team must be available offline."}</p>
                </div>
            </div>
        </motion.div>
    );
};

// Sponsor Card Component
const SponsorCard = ({ name, logo, description, tier }: { name: string; logo?: string; description: string; tier: string }) => {
    const { ref, isInView } = useOneTimeAnimation();

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.7 }}
            whileHover={{
                y: -10,
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
            }}
            className="bg-white rounded-xl shadow-lg overflow-hidden"
        >
            <div className={`h-2 ${tier === "gold" ? "bg-yellow-500" : "bg-blue-500"}`}></div>
            <div className="p-8">
                <div className="flex justify-center mb-6">
                    <div className="w-60 h-60 border rounded-lg p-2 flex items-center justify-center">
                        {logo ? (
                            <Image src={logo} alt={name} width={240} height={120} />
                        ) : (
                            <div className="text-gray-400 text-xl font-bold">{name}</div>
                        )}
                    </div>
                </div>
                <h3 className="text-2xl font-bold text-center mb-3">{name}</h3>
                <p className="text-gray-600 text-center">{description}</p>
            </div>
        </motion.div>
    );
};

export default function HackIIIT() {
    return (
        <main className="overflow-hidden text-center md:text-left">
            {/* Hero Section */}
            <div
                className="text-white min-h-screen flex flex-col items-center justify-center py-16 bg-[#11101f]"
            >
                <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="md:w-1/2 mb-10 md:mb-0"
                    >
                        <h1 className="text-5xl md:text-7xl font-extrabold leading-tight mb-4">
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">HackIIIT</span> 2025
                        </h1>
                        <p className="text-xl md:pr-10 text-gray-300">
                            OSDG&apos;s annual 24-hour hackathon for building impactful Free and Open-Source Software projects.
                        </p>

                        <div className="flex flex-wrap gap-4 mt-8 justify-center md:justify-start">
                            <motion.div
                                whileHover={{ scale: 1.1 }}
                                className="flex items-center bg-blue-900 bg-opacity-30 px-3 py-2 rounded-full"
                            >
                                <FontAwesomeIcon icon={faCalendar} className="mr-2 text-blue-400" />
                                <span>March 15-16, 2025</span>
                            </motion.div>
                            <motion.div
                                whileHover={{ scale: 1.1 }}
                                className="flex items-center bg-blue-900 bg-opacity-30 px-3 py-2 rounded-full"
                            >
                                <FontAwesomeIcon icon={faClock} className="mr-2 text-blue-400" />
                                <span>2:00 PM Onwards</span>
                            </motion.div>
                            <motion.div
                                whileHover={{ scale: 1.1 }}
                                className="flex items-center bg-blue-900 bg-opacity-30 px-3 py-2 rounded-full"
                            >
                                <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2 text-blue-400" />
                                <span>IIIT Hyderabad Campus</span>
                            </motion.div>
                        </div>

                        <CountdownTimer />

                        <motion.div
                            className="mt-8"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <a
                                href="#register"
                                className="inline-block px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold rounded-lg transition-all"
                            >
                                Register Now
                            </a>
                        </motion.div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="md:w-1/2 flex justify-center"
                    >
                        <Image src={hackathonGraphic} alt="HackIIIT &apos;'25" className="max-w-full" />
                    </motion.div>
                </div>
            </div>

            {/* About Section */}
            <section className="py-20 bg-white text-gray-800">
                <div className="container mx-auto px-4">
                    <AnimatedSection>
                        <h2 className="text-4xl font-bold text-center mb-4">About the Event</h2>
                        <div className="w-24 h-1 bg-blue-600 mx-auto mb-12"></div>
                    </AnimatedSection>

                    <div className="max-w-3xl mx-auto">
                        <AnimatedSection delay={0.3}>
                            <p className="text-lg mb-6 text-justify mx-auto max-w-2xl">
                                HackIIIT is OSDG&apos;s annual 24-hour hackathon dedicated to building and working on cool and impactful Free and Open-Source Software (FOSS) projects. It&apos;s an opportunity for innovators to come together, collaborate, and transform ideas into reality.
                            </p>
                        </AnimatedSection>

                        <div className="mt-16 grid md:grid-cols-2 gap-8">
                            <AnimatedSection delay={0.4}>
                                <ParticipationCard isSolo={true} />
                            </AnimatedSection>

                            <AnimatedSection delay={0.5}>
                                <ParticipationCard isSolo={false} />
                            </AnimatedSection>
                        </div>

                        <AnimatedSection delay={0.6}>
                            <div className="mt-12 p-6 bg-blue-50 rounded-lg shadow-md mx-auto max-w-md">
                                <h3 className="text-xl font-bold mb-3 flex items-center justify-center">
                                    <FontAwesomeIcon icon={faTrophy} className="text-blue-600 mr-2" />
                                    FOSS Focus
                                </h3>
                                <p className="text-justify">
                                    All projects must adhere to FOSS principles, with clear documentation and open-source licenses that promote community contribution.
                                </p>
                            </div>
                        </AnimatedSection>
                    </div>
                </div>
            </section>

            {/* Tracks Section */}
            {/* <section className="py-20 bg-[#11101f] text-white">
                <div className="container mx-auto px-4">
                    <AnimatedSection>
                        <h2 className="text-4xl font-bold text-center mb-4">Event Tracks</h2>
                        <div className="w-24 h-1 bg-blue-400 mx-auto mb-12"></div>
                    </AnimatedSection>

                    <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
                        <AnimatedSection delay={0.3}>
                            <div className="bg-[#1a1930] p-6 rounded-lg shadow-xl">
                                <TrackIllustration isRegular={true} />
                                <h3 className="text-2xl font-bold mb-4">Regular Track</h3>
                                <p className="text-gray-300 mb-6">
                                    For experienced developers ready to tackle complex problems and create innovative solutions. Hosted by MontyCloud, this track offers challenging problems and substantial rewards.
                                </p>
                                <ul className="text-gray-300 space-y-2">
                                    <li className="flex items-start">
                                        <FontAwesomeIcon icon={faCode} className="text-blue-400 mt-1 mr-2" />
                                        <span>Advanced problem statements</span>
                                    </li>
                                    <li className="flex items-start">
                                        <FontAwesomeIcon icon={faBrain} className="text-blue-400 mt-1 mr-2" />
                                        <span>Professional mentoring</span>
                                    </li>
                                    <li className="flex items-start">
                                        <FontAwesomeIcon icon={faLaptopCode} className="text-blue-400 mt-1 mr-2" />
                                        <span>Internship opportunities</span>
                                    </li>
                                </ul>
                            </div>
                        </AnimatedSection>

                        <AnimatedSection delay={0.4}>
                            <div className="bg-[#1a1930] p-6 rounded-lg shadow-xl">
                                <TrackIllustration isRegular={false} />
                                <h3 className="text-2xl font-bold mb-4">Beginners Track</h3>
                                <p className="text-gray-300 mb-6">
                                    Designed for those new to hackathons or programming. Team OSDG hosts this track to provide a supportive environment for learning and growing your skills.
                                </p>
                                <ul className="text-gray-300 space-y-2">
                                    <li className="flex items-start">
                                        <FontAwesomeIcon icon={faLightbulb} className="text-emerald-400 mt-1 mr-2" />
                                        <span>Beginner-friendly challenges</span>
                                    </li>
                                    <li className="flex items-start">
                                        <FontAwesomeIcon icon={faUsers} className="text-emerald-400 mt-1 mr-2" />
                                        <span>Guided mentorship</span>
                                    </li>
                                    <li className="flex items-start">
                                        <FontAwesomeIcon icon={faCode} className="text-emerald-400 mt-1 mr-2" />
                                        <span>Learn-as-you-build approach</span>
                                    </li>
                                </ul>
                            </div>
                        </AnimatedSection>
                    </div>

                    <AnimatedSection delay={0.5}>
                        <div className="max-w-3xl mx-auto mt-12 p-6 bg-[#1a1930] bg-opacity-80 rounded-lg shadow-lg">
                            <div className="flex items-center mb-4">
                                <FontAwesomeIcon icon={faCoffee} className="text-2xl text-yellow-400 mr-3" />
                                <h3 className="text-xl font-bold">Complimentary Refreshments</h3>
                            </div>
                            <p className="text-gray-300">
                                All participants who submit their plan of action will receive complimentary refreshments including energy drinks, soft drinks, chips, and biscuits to fuel your coding marathon! These will be available from Vindya Canteen on campus.
                            </p>
                        </div>
                    </AnimatedSection>
                </div>
            </section> */}

            {/* Timeline Section */}
            <section className="py-20 bg-white text-gray-800 relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 pointer-events-none">
                    <div className="w-full h-full" style={{
                        backgroundImage: 'radial-gradient(circle, #4338ca 1px, transparent 1px)',
                        backgroundSize: '20px 20px'
                    }}></div>
                </div>

                <div className="container mx-auto px-4 relative z-10">
                    <AnimatedSection>
                        <h2 className="text-4xl font-bold text-center mb-4">Event Timeline</h2>
                        <div className="w-24 h-1 bg-blue-600 mx-auto mb-16"></div>
                    </AnimatedSection>

                    <div className="max-w-5xl mx-auto">
                        <div className="relative">
                            {/* Timeline line */}
                            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-blue-400 via-indigo-500 to-blue-600 rounded-full"></div>

                            {/* Timeline items */}
                            <div className="space-y-0">
                                <TimelineItem
                                    time="March 15, 2PM - 3PM"
                                    title="Introductions"
                                    description="Meet the organizers and fellow participants. Get ready for an exciting hackathon experience!"
                                    isLeft={true}
                                />

                                <TimelineItem
                                    time="March 15, 3PM - 4PM"
                                    title="Problem Statements Revealed"
                                    description="Detailed presentation of hackathon challenges and objectives. Choose your track and start brainstorming solutions."
                                    isLeft={false}
                                />

                                <TimelineItem
                                    time="March 15, 4PM"
                                    title="Hackathon Begins"
                                    description="Start coding! Teams begin working on their projects."
                                    isLeft={true}
                                />

                                <TimelineItem
                                    time="March 15, 6PM"
                                    title="Plan of Action Submission"
                                    description="Teams document initial ideas, preliminary work, and plans for the remainder of the event. This serves as a guiding document for your team."
                                    isLeft={false}
                                />

                                <TimelineItem
                                    time="March 16, 4PM"
                                    title="Hackathon Concludes"
                                    description="Final code submissions, to wrap things up."
                                    isLeft={true}
                                />

                                <TimelineItem
                                    time="March 16, 4PM - 6PM"
                                    title="Closing Notes & Networking"
                                    description="Feedback session, and opportunities to connect with fellow participants. Celebrate your achievements!"
                                    isLeft={false}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Prizes Section */}
            {/* <section className="py-20 bg-[#11101f] text-white">
                <div className="container mx-auto px-4">
                    <AnimatedSection>
                        <h2 className="text-4xl font-bold text-center mb-4">Prizes & Rewards</h2>
                        <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-yellow-600 mx-auto mb-12"></div>
                    </AnimatedSection>

                    <AnimatedSection delay={0.3}>
                        <div className="max-w-5xl mx-auto">
                            <div className="text-center mb-12">
                                <motion.div
                                    initial={{ scale: 0 }}
                                    whileInView={{ scale: 1 }}
                                    transition={{ duration: 0.7 }}
                                    className="text-7xl text-yellow-400 mb-6 inline-block"
                                >
                                    <FontAwesomeIcon icon={faTrophy} />
                                </motion.div>
                                <motion.p
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: 0.3 }}
                                    className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-yellow-200"
                                >
                                    Total Prize Pool: ₹50,000
                                </motion.p>
                            </div>

                            <div className="grid md:grid-cols-2 gap-10">
                                <motion.div
                                    initial={{ opacity: 0, x: -50 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.6 }}
                                    className="bg-gradient-to-br from-blue-900 to-[#1a1930] p-8 rounded-lg shadow-xl"
                                >
                                    <h3 className="text-2xl font-bold text-center mb-6 text-blue-300">Regular Track</h3>
                                    <div className="space-y-4">
                                        <PrizeItem position="1st Place" amount="₹18,000" />
                                        <PrizeItem position="2nd Place" amount="₹12,000" />
                                        <PrizeItem position="3rd Place" amount="₹7,000" />
                                    </div>
                                    <div className="mt-6 p-4 bg-blue-900 bg-opacity-40 rounded-lg">
                                        <p className="text-center text-sm text-blue-200">
                                            <FontAwesomeIcon icon={faLaptopCode} className="mr-2" />
                                            Best performers may be offered internships by MontyCloud based on their work
                                        </p>
                                    </div>
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0, x: 50 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.6 }}
                                    className="bg-gradient-to-br from-emerald-900 to-[#1a1930] p-8 rounded-lg shadow-xl"
                                >
                                    <h3 className="text-2xl font-bold text-center mb-6 text-emerald-300">Beginners Track</h3>
                                    <div className="space-y-4">
                                        <PrizeItem position="1st Place" amount="₹7,000" />
                                        <PrizeItem position="2nd Place" amount="₹4,000" />
                                        <PrizeItem position="3rd Place" amount="₹2,000" />
                                    </div>
                                    <div className="mt-6 p-4 bg-emerald-900 bg-opacity-40 rounded-lg">
                                        <p className="text-center text-sm text-emerald-200">
                                            <FontAwesomeIcon icon={faLightbulb} className="mr-2" />
                                            Great opportunity to gain hackathon experience and showcase your skills
                                        </p>
                                    </div>
                                </motion.div>
                            </div>
                        </div>
                    </AnimatedSection>
                </div>
            </section> */}

            {/* Food Section */}
            {/* <section className="py-16 bg-white text-gray-800">
                <div className="container mx-auto px-4">
                    <AnimatedSection>
                        <h2 className="text-4xl font-bold text-center mb-4">Food & Refreshments</h2>
                        <div className="w-24 h-1 bg-red-500 mx-auto mb-12"></div>
                    </AnimatedSection>

                    <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
                        <AnimatedSection delay={0.3}>
                            <motion.div
                                whileHover={{ y: -10 }}
                                className="bg-gradient-to-br from-gray-50 to-gray-100 p-8 rounded-lg shadow-lg"
                            >
                                <div className="flex justify-center mb-6">
                                    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                                        <FontAwesomeIcon icon={faCoffee} className="text-red-600 text-2xl" />
                                    </div>
                                </div>
                                <h3 className="text-xl font-bold text-center mb-4">Complimentary Refreshments</h3>
                                <p className="text-gray-600 text-center">
                                    All participants who submit their plan of action will receive complimentary refreshments (like energy/soft drinks, chips, and biscuits) from Vindya Canteen.
                                </p>
                            </motion.div>
                        </AnimatedSection>

                        <AnimatedSection delay={0.4}>
                            <motion.div
                                whileHover={{ y: -10 }}
                                className="bg-gradient-to-br from-gray-50 to-gray-100 p-8 rounded-lg shadow-lg"
                            >
                                <div className="flex justify-center mb-6">
                                    <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center">
                                        <FontAwesomeIcon icon={faPizzaSlice} className="text-orange-600 text-2xl" />
                                    </div>
                                </div>
                                <h3 className="text-xl font-bold text-center mb-4">Food Stalls</h3>
                                <p className="text-gray-600 text-center">
                                    Food stalls will be set up outside the Himalaya block, offering Pizza Hut and Amul ice creams. Get ready for some delicious treats!
                                </p>
                            </motion.div>
                        </AnimatedSection>
                    </div>
                </div>
            </section> */}

            {/* Sponsors Section */}
            {/* <section className="py-20 bg-[#11101f] text-white">
                <div className="container mx-auto px-4">
                    <AnimatedSection>
                        <h2 className="text-4xl font-bold text-center mb-4">Our Sponsors</h2>
                        <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-500 mx-auto mb-12"></div>
                    </AnimatedSection>

                    <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10">
                        <AnimatedSection delay={0.3}>
                            <SponsorCard
                                name="MontyCloud"
                                logo="/mcLogo.webp"
                                description="Regular track sponsor with a contribution of ₹40,000 towards prizes, marketing, and logistics. Offering internship opportunities to top performers."
                                tier="gold"
                            />
                        </AnimatedSection>

                        <AnimatedSection delay={0.4}>
                            <SponsorCard
                                name="IIIT Hyderabad"
                                logo="/iiithlogo.jpg"
                                description="Supporting the Beginners track with ₹13,000 for prizes and ₹15,000 for refreshments. Providing venue support and infrastructure for the event."
                                tier="silver"
                            />
                        </AnimatedSection>
                    </div>

                    <AnimatedSection delay={0.5}>
                        <div className="max-w-3xl mx-auto mt-16 p-6 bg-[#1a1930] bg-opacity-80 rounded-lg shadow-md text-center">
                            <h3 className="text-xl font-bold mb-4">Interested in Sponsoring?</h3>
                            <p className="text-gray-300 mb-6">
                                Join our mission to promote open-source innovation and connect with talented developers at IIIT Hyderabad.
                            </p>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-5 py-2 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg font-semibold"
                            >
                                Contact Us for Sponsorship
                            </motion.button>
                        </div>
                    </AnimatedSection>
                </div>
            </section> */}

            {/* Add styles for animations */}
            <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }
        
        @keyframes pulse {
          0% { transform: scale(0.95); opacity: 0.7; }
          100% { transform: scale(1.05); opacity: 1; }
        }
      `}</style>
        </main>
    );
}