import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import styles from '../../styles/QBHacks.module.css';
import NET from 'vanta/dist/vanta.net.min';
import * as THREE from 'three';


const PrizeCard = ({ pos, text, prize }) => {

    return (
        <div className={`${styles.prizeCard} card px-5 py-3 mx-2 my-2`}>
            <div className="card-body d-flex flex-column align-items-center">
                <img className="img-fluid m-4" src={pos} width="200" />
                <p className='lead text-center'>{text}</p>
                <h3 className="text-center mt-3 mb-0">{prize}</h3>
            </div>
        </div>
    );

};

const EventCard = ({ time, date, desc }) => {

    return (
        <div className="d-flex flex-row my-1" >
            <div className={`${styles.eventTime} rounded-start p-3 d-flex flex-column justify-content-center`}>
                <p className="display-6 font-bold text-end mb-0">{time}</p>
                <p className="h6 text-end mb-0">{date}</p>
            </div>
            <div className={`${styles.eventDesc} rounded-end p-3`}>
                <p className="h3 display-md-5 my-1 ms-3">{desc}</p>
            </div>
        </div>
    )
};

const FormatDesc = ({ title, duration, desc }) => {

    return (

        <div className="d-flex flex-column my-3">
            <h1 className="display-6"><span className="text-muted"><strong>#</strong></span> {title}</h1>
            <h1 className="h4"><span className="text-muted"><strong>##</strong> {duration}</span></h1>
            <p className={`${styles.formatDesc} lead`}>• {desc}</p>
        </div>

    );
};

const FAQCard = ({ question, answer }) => {

    return (
        <div className={`${styles.faqCard} card col-12 my-3 col-md-5 mx-2`}>
            <div className="card-body">
                <h3 className="card-title"><strong className="text-primary">?</strong> {question}</h3>
                <p className="card-text lead"><strong className="text-success">➜</strong> {answer}</p>
            </div>
        </div>
    );

};

const QBHacks = () => {

    const [vantaEffect, setVantaEffect] = useState(0);
    const vantaRef = useRef(null);

    useEffect(() => {
        if (!vantaEffect) {
            setVantaEffect(NET({
                el: vantaRef.current,
                backgroundColor: 0x0F0B1C,
                color: 0x6dbeff,
                showDots: false,
                points: 20.0,
                touchControls: false,
                mouseControls: false,
                gyroControls: false,
                THREE
            }));
        }
        return () => {
            if (vantaEffect) vantaEffect.destroy();
        }
    }, [vantaEffect]);

    return (
        <>
            <Head>
                <title>QuestBook Hacks</title>
            </Head>
            <div className={`${styles.divLanding} d-flex flex-row`} ref={vantaRef}>
                <div className="d-flex flex-column align-items-center mt-3 col-12">
                    <h1 className="font-weight-bold display-1">QBHacks</h1>
                    <h4 className="text-start ms-3 font-weight-light">Powered by
                        <span>
                            <a href="https://www.questbook.app/" target="_blank" rel="noreferrer">
                                <img className="rounded ms-3" width="30px" src="https://bookface-images.s3.amazonaws.com/logos/b34603290af8de5f68dd919b112bcb5e3e8d78ef.png" />
                            </a>
                        </span>
                    </h4>
                    <div className="my-3" />
                    <h2 className="">3<sup>rd</sup> to 21<sup>st</sup> November 2021</h2>
                    <div className="d-flex flex-column flex-md-row justify-content-center">
                        <a className={`btn ${styles.btnDiscord} btn-lg m-2`} href="https://discord.gg/wYzGSCVWgf" target="_blank" rel="noreferrer"><span><img className="me-2" src="https://hackon.tech/_nuxt/img/discord.2a0169a.svg" />Discord Server</span></a>
                        <a className={`btn ${styles.btnRegister} btn-lg m-2`} href="https://creatoros.typeform.com/to/HLr33teC?utm_source=xxxxx&utm_medium=xxxxx&utm_term=xxxxx" target="_blank" rel="noreferrer"><span><img className="me-2" src="https://tripetto.com/images/alternatives/typeform.png" width="35" />Register Now</span></a>
                    </div>
                </div>
            </div>
            <div className={`${styles.divIntro} mb-5 p-5`}>
                <h2 className="pt-md-0 pt-sm-5 text-center display-1">Welcome to QBHacks!</h2>
                <div className="d-flex flex-md-row flex-column justify-content-evenly mt-5">
                    <div className="col-md-6 col-12 d-flex flex-column align-items-center justify-content-center">
                        <p className="lead text-start">QBHacks is an event organized by Open Source Developer Group (OSDG), IIIT Hyderabad, in partnership with Questbook. The hackathon is spread over 4 weeks, with participation from students from various colleges across the globe.</p>
                        <p className="lead text-start">Participants learn different Web3 concepts, get mentorship from industry experts, get an opportunity to network with some of the brightest crypto aspirants and will get an opportunity to build the next Aave or Axie Infinity or Topshots or DogeCoin 😜 !</p>
                        <p className="lead text-start">We have an amazing learning community with with hundereds of enthusiatic developers, all eager to learn the latest Blockchain technologies over on our <a href="https://discord.gg/wYzGSCVWgf" className="text-primary">Discord Server</a>. It would be amazing to have you there too! </p>
                    </div>
                    <div className="d-flex flex-column justify-content-center col-12 col-md-4 col-lg-3">
                        <img src="https://thumbs.gfycat.com/EqualPowerfulKoodoo-size_restricted.gif" className="img-fluid" />
                    </div>
                </div>
            </div>
            <div className={`${styles.divPrizes} my-5 pt-5 px-5 pb-3`}>
                <h1 className="text-center display-2">Prizes, Prizes, Prizes!</h1>
                <div className="d-flex flex-wrap justify-content-around mt-5">
                    <PrizeCard pos="https://media.discordapp.net/attachments/900318266587742228/900340215003107368/1.png" text="First Prize" prize="1 ETH" />
                    <PrizeCard pos="https://media.discordapp.net/attachments/900318266587742228/900340216072663050/2.png" text="Second Prize" prize="0.5 ETH" />
                    <PrizeCard pos="https://media.discordapp.net/attachments/900318266587742228/900340219499393025/3.png" text="Third Prize" prize="0.5 ETH" />
                    <p className="lead mt-5 px-1 px-md-5">All the shortlisted project teams will get mentorship from Questbook team and industry experts. 5 select teams will be part of a cohort that will undergo 20hr rigorous project development training by one of the industry renowned crypto architects. </p>
                </div>
            </div>
            <div className={`${styles.divTimeline} my-5 py-5 px-2 px-md-5`}>
                <h1 className="text-center display-2">The Timeline</h1>
                <div className="d-flex flex-column justify-content-around mt-5">
                    <p className="text-muted">*All the timings mentioned are in the IST Timezone</p>
                    <EventCard time="20:00" date="20th Oct" desc="Registration Begins" />
                    <EventCard time="20:00" date="30th Oct" desc="Registration Closes" />
                    <EventCard time="00:00" date="20th Nov" desc="Submission Deadline" />
                    <EventCard time="Evening" date="20th Nov" desc="Round 2 Presentations" />
                    <EventCard time="Morning" date="21st Nov" desc="Round 2 Presentations" />
                    <EventCard time="Evening" date="21st Nov" desc="Winners Announcement" />
                </div>
            </div>
            <div className={`${styles.divFormat} my-5 p-5`}>
                <h1 className="text-center display-2">Event Format</h1>
                <div className="d-flex flex-column mt-3">
                    <FormatDesc title="Learning Web3 Basics" duration="21st Oct - 6th Nov" desc={<>Learn from resources provided on <a href="https://questbook.app">Questbook.app</a>. Participate in daily live sessions and community conversations on the quests on the <a href="https://discord.gg/wYzGSCVWgf">Discord server.</a></>} />
                    <FormatDesc title="Practice problems" duration="7th Nov - 13th Nov" desc={<>Time to hone your skills by practicing a few coding problems and sample projects.</>} />
                    <FormatDesc title="Ideate & Execute" duration="14th Nov - 18th Nov" desc={<>Form your team(ideally 3-6 member team), ideate your project, get mentorship from the Questbook team & coaches, discuss with the community and start building your prototype.</>} />
                    <FormatDesc title="Presentation" duration="19th Nov - 21st Nov" desc={<>Submit your demo and presentation by 19th Nov. 10 Shortlisted projects will be given 30 mins each to present and answer judges questions. </>} />
                    <FormatDesc title="Aftermath" duration="Post 21st Nov" desc={<>Hackathon ends on 21st Nov but the learning on Questbook never will. Motivated learners can continue their projects, get mentors, community support and if progressing significantly, even some funding from the investors!</>} />
                </div>
            </div>
            <div className={`${styles.divFAQ} mt-5 py-5 px-3 px-md-5`}>
                <h1 className="text-center display-2 mb-5">Frequently Asked questions</h1>
                <div className="d-flex flex-wrap justify-content-center">
                    <FAQCard question="How do I register?" answer={<>Use the below link to register for the hackathon: <a href="https://creatoros.typeform.com/to/HLr33teC?utm_source=xxxxx&utm_medium=xxxxx&utm_term=xxxxx" target="_blank" rel="noreferrer">Registration Form</a></>} />
                    <FAQCard question="Is there any registration fee?" answer={<>Learning is free on Questbook and so is the participation fee for the Hackathon. All we expect from the participants is the hunger and enthusiam to learn web3 technologies and this Hackathon will show you myriads of such opportunities.</>} />
                    <FAQCard question="Who can participate in this event?" answer={<>Any student from any college or university across the globe can participate. We are also inviting a few beginner level learners from Questbook partnered Blockchain clubs to participate. </>} />
                    <FAQCard question="Is this a team event or individual event?" answer={<>Each participant has to register individually on the link provided above. However, during the last week of -’Ideate and execute’, learners will collaborate and form teams to participate in the hackathon.<br />
                        So, this is a great opportunity to interact with brilliant crypto enthusiasts across the globe!</>} />
                    <FAQCard question="What should be the team size and restrictions?" answer={<>The hackathon can be anywhere between 2-6 team members. Each team will also have to nominate a team leader. Any exception to this has to be approved by Hackathon organizers.</>} />
                    <FAQCard question="How will the teams be shortlisted for Round 2?" answer={<>Top 10 teams that clearly present their idea, unique proposition, technical complexity and submit a working MVP will be invited to present their projects and the Team leader is given 15 mins to present the project and 15 mins to take questions from the judges.</>} />
                    <FAQCard question="What is expected as a Hackathon submission?" answer={<> The following is expecte from a submission:<br />
                        a. A basic working prototype code<br />
                        b. A slideshow presentation with upto 6 slides showcasing the idea, unique elements of the project, technology and the use cases<br />
                        Both these are mandatory and the submission will be considered invalid if it misses either of the two. All submissions should follow the following code of conduct.</>} />
                    <FAQCard question="Do you have any restrictions on the programming language?" answer={<>Most of the quests that participants learn will be in Solidity. However, the participants are free to choose their programming language of choice.</>} />
                    <FAQCard question="What prerequisite programming skills are required to participate?" answer={<>You should definitely have some exposure to programming and having earlier exposure to Javascript will greatly help your learning curve. Even if you don’t have any programming skills, we encourage you to participate. This is not all about winning. You will get amazing learning experience and importantly be exposed to a vibrant crypto community that is extremely collaborative.</>} />
                    <FAQCard question="I have some more questions. Who can answer those questions?" answer={<>Reachout to <a href="mailto:help@questbook.app">help@questbook.app</a> for any questions related to the hackathon registration or format questions. You can even pose the questions to the Discord community and one of our team members will address your questions. </>} />
                </div>
            </div>

        </>);

};


export default QBHacks;