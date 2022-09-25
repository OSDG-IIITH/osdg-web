import Head from "next/head";
import styles from "../../styles/Team.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";

const TeamMemberCard = ({ memberData }) => {
  return (
    <div className="mx-2">
      <div className="d-flex flex-row">
        <div className={`${styles.imgContainer} d-flex flex-column`}>
          <img
            src={memberData.img}
            alt=""
            className="img-fluid rounded"
            style={{ width: "200px" }}
          />
          <div className="d-flex flex-row justify-content-end">
            <div className={`${styles.teamMemberName} display-table px-2 py-1`}>
              {memberData.name}
            </div>
          </div>
        </div>
        <div className="d-flex flex-column justify-content-end fs-4 ms-1">
          {memberData.web && (
            <a
              className={styles.teamMemberLinks}
              rel="noreferrer"
              target="_blank"
              href={memberData.web}
            >
              <FontAwesomeIcon icon={faGlobe} />
            </a>
          )}
          {memberData.linkedin && (
            <a
              className={styles.teamMemberLinks}
              rel="noreferrer"
              target="_blank"
              href={memberData.linkedin}
            >
              <FontAwesomeIcon icon={faLinkedin} />
            </a>
          )}
          {memberData.github && (
            <a
              className={styles.teamMemberLinks}
              rel="noreferrer"
              target="_blank"
              href={memberData.github}
            >
              <FontAwesomeIcon icon={faGithub} />
            </a>
          )}
          <span className="mb-5" />
        </div>
      </div>
    </div>
  );
};

const Team = () => {
  const departments = [
    "coordinators",
    "design",
    "outreach",
    "tech",
  ];

  const coordinators = [
    {
      name: "Vamshi Krishna",
      img: "Images/Team/VamshiKrishna.png",
      web: "https://victorknox.github.io/",
      github: "https://github.com/victorknox",
      linkedin:
        "https://www.linkedin.com/in/vamshi-krishna-bonagiri-ba221b1bb/",
    },
    {
      name: "Pratyaksh Gautam",
      img: "Images/Team/PratyakshGautam.png",
      web: "https://hi-im-buggy.github.io",
      github: "https://github.com/hi-im-buggy",
      linkedin: null,
    },
    {
      name: "Shashwat Singh",
      img: "Images/Team/ShashwatSingh.png",
      web: null,
      github: "https://github.com/shashwat1002",
      linkedin: null,
    }
  ];

  const design = [
    {
      name: "Ananya Sane",
      img: "Images/Team/AnanyaSane.png",
      web: null,
      github: "https://github.com/The-Endurance",
      linkedin: "https://www.linkedin.com/in/ananya-sane-6787511b8",
    },
    {
      name: "Poorva Pisal",
      img: "Images/Team/PoorvaPisal.png",
      web: null,
      github: "https://github.com/poorvapisal",
      linkedin: "https://www.linkedin.com/in/poorva-pisal/",
    },
    {
      name: "Vansh Kohli",
      img: "Images/Team/VanshKohli.png",
      web: null,
      github: "https://github.com/VKohli17",
      linkedin: "https://www.linkedin.com/in/vanshpreet-singh-kohli-iiith",
    },
    {
      name: "Sneha Raju",
      img: "Images/Team/SnehaRaju.png",
      web: null,
      github: "https://github.com/Sneha-223",
      linkedin: "https://www.linkedin.com/in/sneha-raghava-raju/",
    },
    {
      name: "Pratyay Suvarnapathaki",
      img: "Images/Team/PratyaySuvarnapathaki.png",
      web: "https://pratyaydesigns.notion.site/",
      github: "https://github.com/spratyey",
      otherWeb: ["https://twitter.com/spratyey"],
    },
  ];

  const outreach = [
    {
      name: "Soveet Nayak",
      img: "Images/Team/SoveetNayak.png",
      web: null,
      github: "https://github.com/soveetnayak",
      linkedin: null,
    },
    {
      name: "Srija Mukhopadhyay",
      img: "Images/Team/SrijaMukhopadhyay.png",
      web: null,
      github: "https://github.com/sri-ja",
      linkedin: "https://www.linkedin.com/in/ajirs/",
    },
    {
      name: "Prayush Rathore",
      img: "Images/Team/PrayushRathore.png",
      web: null,
      github: "https://github.com/PrayushPai",
      linkedin: "https://www.linkedin.com/mwlite/in/prayush-rathore-2115291b7",
    },
    {
      name: "Bhav Beri",
      img: "Images/Team/BhavBeri.png",
      web: null,
      github: "https://github.com/bhavberi",
      linkedin: "http://linkedin.com/in/bhavberi",
    },
    {
      name: "Vrinda Agarwal",
      img: "Images/Team/VrindaAgarwal.png",
      web: null,
      github: "https://github.com/Vrinda-Agarwal",
      linkedin: null,
      otherWeb: ["https://www.instagram.com/vrinda_.agarwal/"],
    },
    {
      name: "Harshit Aggarwal",
      img: "Images/Team/HarshitAggarwal.png",
      web: null,
      github: "https://github.com/Harshitaggarwal4",
      linkedin: "https://www.linkedin.com/in/harshit-aggarwal-a07278229/",
      otherWeb: ["https://www.instagram.com/harshitaggarwal4/"],
    },
    {
      name: "Sankalp Bahad",
      img: "Images/Team/SankalpBahad.png",
    },
    {
      name: "Adyansh Kakran",
      img: "Images/Team/AdyanshKakran.png",
      github: "https://github.com/AdyanshKakran",
      linkedin: "https://www.linkedin.com/in/adyansh-kakran-996813223/",
    },
    {
      name: "Talib Siddiqui",
      img: "Images/Team/TalibSiddiqui.png",
      github: "https://github.com/talib-sid",
      linkedin: "https://www.linkedin.com/in/talib-siddiqui",
    },
    {
      name: "Venkata Kesav Venna",
      img: "Images/Team/VenkataKesavVenna.png",
      linkedin: "https://www.linkedin.com/in/venkata-kesav-venna-8a489b20b/",
    },
    {
      name: "Varshita Kolipaka",
      img: "Images/Team/VarshitaKolipaka.png",
      site: "https://varshitakolipaka.github.io/",
      linkedin: "https://www.linkedin.com/in/varshitakolipaka/",
      github: "https://github.com/varshitakolipaka/",
    },
  ];

  const tech = [
    {
      name: "Abhijnan Vegi",
      img: "Images/Team/AbhijnanVegi.png",
      web: null,
      github: "https://www.github.com/AbhijnanVegi",
      linkedin: null,
    },
    {
      name: "Gautam Ghai",
      img: "Images/Team/GautamGhai.png",
      web: "https://web.iiit.ac.in/~gautam.ghai/html/index.html",
      github: "https://github.com/gautamxyz",
      linkedin: "https://www.linkedin.com/in/gautam-ghai-079439207",
    },
    {
      name: "Gurkirat Singh",
      img: "Images/Team/GurkiratSingh.png",
      web: "http://gurkiratsingh.me/",
      github: "https://github.com/gsc2001",
      linkedin: "https://www.linkedin.com/in/gsc2001/",
    },
    {
      name: "Akshit Sinha",
      img: "Images/Team/AkshitSinha.png",
      web: "https://web.iiit.ac.in/~akshit.sinha/",
      github: "https://github.com/viciousAegis",
      linkedin: "https://www.linkedin.com/in/akshit-sinha-b2b138222/",
    },
    {
      name: "Prerak Srivastava",
      img: "Images/Team/PrerakSrivastava.png",
      web: "https://github.com/preraks116/perspective",
      github: "https://github.com/preraks116",
      linkedin: "https://www.linkedin.com/in/prerak-srivastava-b84986221/",
    },
    {
      name: "Shamil",
      img: "Images/Team/Shamil.png",
      web: null, //'https://whoami.ntns.in (domain needs renewal, ,so not up rn)',
      github: "https://github.com/necessary129",
      linkedin: null,
    },
    {
      name: "L Lakshmanan",
      img: "Images/Team/LLakshmanan.png",
      web: null,
      github: "https://github.com/KarthikL1729",
		linkedin: "https://www.linkedin.com/in/l-lakshmanan-b4481123b",
    },
    {
      name: "Aneesh Chavan",
      img: "Images/Team/AneeshChavan.png",
      web: null,
      github: "https://github.com/aneeshc12",
      linkedin: null,
    },
    {
      name: "Akshit Kumar",
      img: "Images/Team/AkshitKumar.png",
      web: "https://research.iiit.ac.in/~akshit.kumar",
      github: "https://github.com/komikat",
      linkedin: "https://www.linkedin.com/in/akshit-kumar-229a06147/",
    },
  ];

  return (
    <>
      <Head>
        <title>OSDG - Team</title>
      </Head>
      <div className={`${styles.teamPage} pb-5`}>
        <div
          className={`${styles.topDiv} d-flex flex-column align-items-center`}
        >
          <img
            src="Images/TeamGraphic.svg"
            alt=""
            className="img-fluid w-100"
          />
          <img
            src="Images/TeamGraphic.svg"
            alt=""
            className="d-block d-md-none img-fluid w-100"
            style={{ transform: "scaleY(-1) translateY(1px) rotateZ(0.15deg)" }}
          />
          <h1>Team</h1>
        </div>

        {departments.map((deptName, index) => {
          return (
            <div
              className={`${styles.teamDepartment} row align-items-center mx-5 px-0`}
              key={index}
            >
              <div
                className={`${
                  (index % 2 == 0) ? styles.deptNameLeft : styles.deptNameRight
                } col-lg-4`}
              >
                <h1 className={`${styles.teamDepartmentName}mt-5 mb-4`}>
                  {deptName.charAt(0).toUpperCase() + deptName.slice(1)}
                </h1>
              </div>
              <div
                className={`${
                  (index % 2 == 0)
                    ? styles.deptMembersRight
                    : styles.deptMembersLeft
                } col-lg-8`}
              >
                <div className="d-flex flex-wrap px-5 justify-content-center mt-3 align-items-end">
                  {eval(deptName).sort((a, b) => {
                    return a.name < b.name ? -1 : 1;
                  }).map((m, i) => <TeamMemberCard memberData={m} key={i} />)}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Team;
