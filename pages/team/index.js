import Head from 'next/head';
import styles from '../../styles/Team.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe } from '@fortawesome/free-solid-svg-icons';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';

const TeamMemberCard = ({ memberData }) => {
	return (
		<div className="mx-2">
			<div className="d-flex flex-row">
				<div className={`${styles.imgContainer} d-flex flex-column`}>
					<img src={memberData.img} alt="" className="img-fluid rounded" style={{ width: "200px" }} />
					<div className="d-flex flex-row justify-content-end">
						<div className={`${styles.teamMemberName} display-table px-2 py-1`}>
							{memberData.name}
						</div>
					</div>
				</div>
				<div className="d-flex flex-column justify-content-end fs-4 ms-1">
					{memberData.web && <a className={styles.teamMemberLinks} rel="noreferrer" target="_blank" href={memberData.web}><FontAwesomeIcon icon={faGlobe} /></a>}
					{memberData.linkedin && <a className={styles.teamMemberLinks} rel="noreferrer" target="_blank" href={memberData.linkedin}><FontAwesomeIcon icon={faLinkedin} /></a>}
					{memberData.github && <a className={styles.teamMemberLinks} rel="noreferrer" target="_blank" href={memberData.github}><FontAwesomeIcon icon={faGithub} /></a>}
					<span className="mb-5" />
				</div>
			</div>
		</div>
	);
}

const Team = () => {

	const departments = [
		"coordinators",
		"design",
		"outreach",
		"tech"
	];

	const coordinators = [
		{
			name: 'Dhruv Kapur',
			img: 'Images/Team/DhruvKapur.png',
			web: 'https://web.iiit.ac.in/~dhruv.kapur',
			github: 'https://github.com/dkapur17',
			linkedin: 'https://linkedin.com/in/dhruv-kapur-215010156/'
		},
		{
			name: 'Kshitijaa Jaglan',
			img: 'Images/Team/KshitijaaJaglan.png',
			web: 'https://deutranium.github.io/about/',
			github: 'https://github.com/deutranium/',
			linkedin: 'https://www.linkedin.com/in/kshitijaa-jaglan/',
		},
	];

	const design = [
		{
			name: 'Pratyay Suvarnapathaki',
			img: 'Images/Team/PratyaySuvarnapathaki.png',
			web: 'https://spratyey.github.io',
			github: 'https://github.com/spratyey/',
			linkedin: 'https://www.linkedin.com/in/spratyey/'
		},
		{
			name: 'Ananya Sane',
			img: 'Images/Team/AnanyaSane.png',
			web: null,
			github: 'https://github.com/The-Endurance',
			linkedin: 'https://www.linkedin.com/in/ananya-sane-6787511b8'
		},
		{
			name: 'Poorva Pisal',
			img: 'Images/Team/PoorvaPisal.png',
			web: null,
			github: 'https://github.com/poorvapisal',
			linkedin: 'https://www.linkedin.com/in/poorva-pisal/'
		},
		{
			name: 'Vansh Kohli',
			img: 'Images/Team/VanshKohli.png',
			web: null,
			github: 'https://github.com/VKohli17',
			linkedin: 'https://www.linkedin.com/in/vanshpreet-singh-kohli-631a771bb/',
		},
		{
			name: 'Sneha Raju',
			img: 'Images/Team/SnehaRaju.png',
			web: null,
			github: null,
			linkedin: null,
		},
	];

	const outreach = [
		{
			name: 'Soveet Nayak',
			img: 'Images/Team/SoveetNayak.png',
			web: null,
			github: 'https://github.com/soveetnayak',
			linkedin: null
		},
		{
			name: 'Vaibhav Tomar',
			img: 'Images/Team/VaibhavTomar.png',
			web: null,
			github: 'https://github.com/vstflugel',
			linkedin: null
		},
		{
			name: 'Prayush Rathore',
			img: 'Images/Team/PrayushRathore.png',
			web: null,
			github: 'https://github.com/PrayushPai',
			linkedin: 'https://www.linkedin.com/mwlite/in/prayush-rathore-2115291b7'
		}
	];

	const tech = [
		{
			name: 'Abhijnan Vegi',
			img: 'Images/Team/AbhijnanVegi.png',
			web: null,
			github: 'https://www.github.com/AbhijnanVegi',
			linkedin: null
		},
		{
			name: 'Akshat Dalton',
			img: 'Images/Team/AkshatDalton.png',
			web: null,
			github: 'https://github.com/akshatdalton',
			linkedin: 'https://www.linkedin.com/in/akshat-akshat'
		},
		{
			name: 'Shubh Agarwal',
			img: 'Images/Team/ShubhAgarwal.png',
			web: null,
			github: 'https://github.com/akshatdalton',
			linkedin: 'https://www.linkedin.com/in/akshat-akshat'
		},
		{
			name: 'Yash Mehan',
			img: 'Images/Team/YashMehan.png',
			web: 'https://yash4242.github.io',
			github: 'https://github.com/yash4242',
			linkedin: 'https://www.linkedin.com/in/yash-mehan-14800b159/'
		},
		{
			name: 'Vamshi Krishna',
			img: 'Images/Team/VamshiKrishna.png',
			web: 'https://victorknox.github.io/',
			github: 'https://github.com/victorknox',
			linkedin: 'https://www.linkedin.com/in/vamshi-krishna-bonagiri-ba221b1bb/'
		},
		{
			name: 'Sanchit Arora',
			img: 'Images/Team/SanchitArora.png',
			web: null,
			github: 'https://github.com/tichnas',
			linkedin: 'https://www.linkedin.com/in/tichnas/'
		},
		{
			name: 'Freyam Mehta',
			img: 'Images/Team/FreyamMehta.png',
			web: 'https://freyam.netlify.app',
			github: 'https://github.com/freyam',
			linkedin: 'https://www.linkedin.com/in/freyam-mehta'
		},
		{
			name: 'Gautam Ghai',
			img: 'Images/Team/GautamGhai.png',
			web: 'https://web.iiit.ac.in/~gautam.ghai/html/index.html',
			github: 'https://github.com/gautamxyz',
			linkedin: 'https://www.linkedin.com/in/gautam-ghai-079439207'
		},
		{
			name: 'Shashwat Singh',
			img: 'Images/Team/ShashwatSingh.png',
			web: null,
			github: 'https://github.com/shashwat1002',
			linkedin: null
		},
		{
			name: 'Gurkirat Singh',
			img: 'Images/Team/GurkiratSingh.png',
			web: null,
			github: 'https://github.com/gsc2001',
			linkedin: 'https://www.linkedin.com/in/gsc2001/'
		},
		{
			name: 'Shirley',
			img: 'Images/Team/Shirley.png',
			web: 'https://hohilwik.com',
			github: 'https://github.com/hohilwik',
			linkedin: null
		},
		{
			name: 'Swetha Vipparla',
			img: 'Images/Team/SwethaVipparla.png',
			web: null,
			github: 'https://github.com/SwethaVipparla',
			linkedin: 'https://www.linkedin.com/in/swethavipparla/'
		},
		{
			name: "Pratyaksh Gautam",
			img: 'Images/Team/PratyakshGautam.png',
			web: null,
			github: 'https://github.com/hi-im-buggy',
			linkedin: null
		},
		{
			name: "Kannav Mehta",
			img: 'Images/Team/KannavMehta.png',
			web: null,
			github: 'https://github.com/exclowd',
			linkedin: 'https://www.linkedin.com/in/kannavkmehta/'
		}

	];

	return (
		<>
			<Head><title>OSDG - Team</title></Head>
			<div className={`${styles.teamPage} pb-5`}>
				<div className={`${styles.topDiv} d-flex flex-column align-items-center`}>
					<img src="Images/TeamGraphic.svg" alt="" className="img-fluid w-100" />
					<img src="Images/TeamGraphic.svg" alt="" className="d-block d-md-none img-fluid w-100" style={{ transform: "scaleY(-1) translateY(1px) rotateZ(0.15deg)" }} />
					<h1>Team</h1>
				</div>

				{
					departments.map((deptName, index) => {
						return (
							<div className={`${styles.teamDepartment} row align-items-center mx-5 px-0`} key={index}>
								<div className={`${ (index % 2 == 0)? styles.deptNameLeft: styles.deptNameRight } col-lg-4`}>
									<h1 className="mt-5 mb-4">{deptName.charAt(0).toUpperCase() + deptName.slice(1)}</h1>
								</div>
								<div className={`${ (index % 2 == 0)? styles.deptMembersRight: styles.deptMembersLeft } col-lg-8`}>
									<div className="d-flex flex-wrap px-5 justify-content-center mt-3 align-items-end">
										{
											eval(deptName).sort((a, b) => {
											return a.name < b.name ? -1 : 1;
										}).map((m, i) => <TeamMemberCard memberData={m} key={i} />)}
									</div>
								</div>
							</div>
						);
					})
				}

			</div>
		</>
	);
}

export default Team;
