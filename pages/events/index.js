import { useState } from 'react';
import Head from 'next/head';
import styles from '../../styles/Events.module.css';
import EventCarousel from '../../components/EventCarousel';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faClock } from '@fortawesome/free-regular-svg-icons';

const Events = () => {

    const [selectedEvent, setSelectedEvent] = useState(2);

    const eventList = [
        {
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Python-logo-notext.svg/2048px-Python-logo-notext.svg.png",
            title: "Intro to Python",
            description: "Introducing the basics of Python, and understanding its fundamentals",
            longDesc: [
                "Python is one of the most popular general-purpose programming languages. It is used in several fields including web development, machine learning, game development, physics simulations, controlling robots and many more. You name it, and there is almost indefinitely going to be a way to do it in Python.",
                "In this seminar, we introduce the basics of the Python programming language to beginners, preferably with some prior programming experience. Primarily targetted at the students of UG-1 at IIIT-H. We'll cover the fundamentals of the language such as variables, conditional logic, loops and functions. We'll also look at Python's vast variety of built in data structures such as lists and dictionaries. The learn-by-doing approach of this seminar will help solidify the foundations of Python in your mind."],
            date: "May 2021",
            day: "22th May, 2021",
            time: "9:00 PM",
            links: [{ text: 'Zoom Link', url: "https://iiit-ac-in.zoom.us/j/95228765836" }],
            contacts: ["osdg@students.iiit.ac.in", "manan.goel@research.iiit.ac.in"]
        },
        {
            image: "https://scontent.fdel52-1.fna.fbcdn.net/v/t1.6435-9/200875247_2965735953698878_3383427803708527748_n.jpg?_nc_cat=107&ccb=1-5&_nc_sid=8bfeb9&_nc_ohc=jGt7C41FzLkAX93uv_J&_nc_ht=scontent.fdel52-1.fna&oh=7874aed47ca8d06338363302112e4743&oe=619130AC",
            title: "SummerUp",
            description: "A month long hackathon with a chance to be win funding to launch a new start up.",
            longDesc: ["There’s 104 days of summer vacation, and the lockdown has just messed it up. So E-Cell IIIT-H, in collaboration with OSDG IIIT-H, has come up with a solution, our 40 - day event called “SummerUp”!",
                "Bring out your inner innovator and come up with a project idea which has the potential to solve a problem (and win prizes, of course!) and around which a sustainable startup can be built, the startup can be a profitable one or a social entrepreneurship based not for profit startup. Then in a 40 day period, implement the technologies related to it. Team up with as many friends as you want, there are no restrictions at all! (But keep in mind that you want to have a decent share of prize money per person.)",
                "The main goal of this event is to help you see exactly how your idea can progress into a real world application and the amount of hard work required in order to bring it into reality. It’s okay if you haven’t got the technical skills to implement your ideas yet, that’s what this platform is for! With the help of our amazing mentors to guide you with the technical aspects, you’ll gain new skills and be able to get your hands dirty with them over the course of under two months."
            ],
            date: "July 2021",
            day: "10th July, 2021",
            time: "All day",
            links: [{ text: 'SummerUp Official Webpage', url: "https://ecell.iiit.ac.in/summerup/" }],
            contacts: ["ecell@iiit.ac.in", "osdg@students.iiit.ac.in"]
        },
        {
            image: "https://i.pinimg.com/474x/77/0c/e5/770ce5db197bf1cdf239e49757666480.jpg",
            title: "Intro to Linux",
            description: "A beginner friendly introduction to Linux Based Operating Systems for first time users.",
            longDesc: ["The very first step in a developer's Open Source journey is to understand the Linux Operating System. Linux is everywhere. It powers well over 90% of all web servers, all Android devices use the Linux Kernal under the hood and even several embedded system technologies rely on Linux.",
                "As a developer, being comfortable with Linux is one of the most important skills you could have. Unlike other popular operating systems, Linux is designed to increase productivity, with most of the features accessible throught 'The Terminal'.",
                "This seminar is targetted at first time Linux Users, we'll be covering the basics, such as file system navigation, file manipulation and some more useful commands. We will not be covering the installation of Linux, some distribution of Linux should already be installed on your system."],
            date: "Oct 2021",
            day: "TBD",
            time: "TBD",
            links: [{ text: 'Dual Booting Ubuntu with Windows', url: 'https://itsfoss.com/install-ubuntu-dual-boot-mode-windows/' }],
            contacts: ["osdg@students.iiit.ac.in"]
        },
        {
            image: "https://bookface-images.s3.amazonaws.com/logos/b34603290af8de5f68dd919b112bcb5e3e8d78ef.png",
            title: "QBHacks",
            description: "Learn the latest blockchain standards today and stand a chance to earn crypto on the way!",
            longDesc: ["QBHacks is an event organized by Open Source Developer Group (OSDG), IIIT Hyderabad, in partnership with Questbook. The hackathon is spread over 4 weeks, with participation from students from various colleges across the globe.",
                "Participants learn different Web3 concepts, get mentorship from industry experts, get an opportunity to network with some of the brightest crypto aspirants and will get an opportunity to build the next Aave or Axie Infinity or Topshots or DogeCoin 😜 !"],
            date: "Nov 2021",
            day: "3rd - 21st Nov, 2021",
            time: "All Day",
            links: [{ text: 'QBHacks Official Page', url: "/qbhacks" },
            { text: 'Questbook.app', url: "https://questbook.app" },
            { text: 'Registraion Form', url: "https://creatoros.typeform.com/to/HLr33teC?utm_source=xxxxx&utm_medium=xxxxx&utm_term=xxxxx" }],
            contacts: ["help@questbook.app", "osdg@students.iiit.ac.in"]

        },
        {
            image: "https://git-scm.com/images/logos/downloads/Git-Icon-1788C.png",
            title: "Intro to Git",
            description: "Covering the basics of Git and GitHub and helping you take your first step in your Open Source journey.",
            longDesc: ["Collaboration lies at the heart of Open Source. But with hundreds of different people working on the same project, at different times, from different places, don't you think it becomes difficult to coordinate their approaches. Even worse if what one implemented conflicts something someone else wrote. Clearly, we need a way to resolve this.",
                "Git is the answer. It is the cornerstone of Open Source development. Git provides a clean and simple way collaborate with others while allowing huge teams to work coherently on a single project, while also allowing tracking of the status of the project from beginning to end. Git goes hand in hand with GitHub, a free online public repository storage system powered by Git, to make your projects more accessible",
                "In this seminar we'll be looking at how Version Control with Git works and how to use it in conjunction with GitHub. You'll also be making your first Pull Request to a repository on your way to your amazing Open Source Journey."
            ],
            date: "Nov 2021",
            day: "TBD",
            time: "TBD",
            links: [],
            contacts: ["osdg@students.iiit.ac.in"]
        },

        {
            image: "https://media.discordapp.net/attachments/868064937132568586/888107155679498260/Untitled-1.png?width=701&height=701",
            title: "Open Tech Summit",
            description: "The ultimate Open Source Event with talks, contests and a whole lot of fun!",
            longDesc: ["Software development is so much more than just making websites and apps, and Open Source is present in every single one of these areas. Some of the best software out there is open source, because people who have the know how, work together, of their own voalition, and collaborate to make something amazing.",
                "But how on Earth do you go from writing simple print('Hello World') to doing what they do and create amazing software that are used by millions of people everyday? Why not have the people who actually do this answer the question for you?",
                "Open Tech Summit 2021, is the first of kind of event hosted by OSDG. We'll bring you talks from several speakers from several different professionals in various fields and also give you a chance to showcase your own skills to win amazing prizes in the wide variety of contests that we'll have, ranging from CTFs, GameJams, Quantum Programming and so many more!",],
            date: "Dec 2021",
            day: "TBD",
            time: "TBD",
            links: [],
            contacts: ["osdg@students.iiit.ac.in"]
        }
    ]
    return <>
        <Head>
            <title>OSDG - Events</title>
        </Head>
        <div className={`${styles.topDiv} d-flex flex-column align-items-center`}>
            <h1 className='intro-heading my-3'>Events</h1>
            <div className="container pb-5">
                <EventCarousel eventList={eventList} setSelectedEvent={setSelectedEvent} />
            </div>
        </div>
        <div className={`${styles.eventData} p-2 p-md-3 p-lg-5 pb-5`}>
            <h1 className='mb-5 text-center mt-3'>{eventList[selectedEvent].title}</h1>
            <div className="d-flex flex-column flex-md-row mt-3 justify-content-center">
                <div className="col-12 col-md-6 col-lg-5 px-md-3 px-lg-5 px-2 ">
                    <h3 className="text-center">Details</h3>
                    <div className={`${styles.eventWhen} d-flex flex-row justify-content-around mt-3 mb-4`}>
                        <span><FontAwesomeIcon icon={faCalendar} /> {eventList[selectedEvent].day}</span>
                        <span><FontAwesomeIcon icon={faClock} /> {eventList[selectedEvent].time}</span>
                    </div>
                    {eventList[selectedEvent].longDesc.map((d, i) => <p className={styles.eventDetails} key={i}>{d}</p>)}
                </div>
                <div className="d-none d-md-block border-end border-2 border-dark m-0 p-0" />
                <div className="d-flex flex-column justify-content-between col-12 col-md-6 col-lg-5 px-3 px-lg-5">
                    <div>
                        <h3 className="">Links</h3>
                        {eventList[selectedEvent].links.length ?
                            eventList[selectedEvent].links.map((e, i) => <a className="d-block fw-light text-primary" rel="noreferrer" href={e.url} target="_blank" key={i}>{e.text}</a>)
                            : <p className="lead">Stay tuned for updates...</p>}
                    </div>
                    <div>
                        <h3 className="">Contact</h3>
                        {eventList[selectedEvent].contacts.map((e, i) => <a className="d-block fw-light text-primary" href={`mailto:${e}`} key={i}>{e}</a>)}
                    </div>
                </div>
            </div>
        </div>
    </>
};

export default Events;