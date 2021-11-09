import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faGithub, faLinkedin, faInstagram } from "@fortawesome/free-brands-svg-icons";

const Footer = () => {

    return (
        <footer className='footer py-5'>
            <div className="d-flex flex-sm-row flex-column justify-content-center align-items-center">
                <div className='col-4 col-md-3 my-3 order-2 order-sm-1'>
                    <img src="Images/BrandLogo.png" width='100px' alt="OSDG" className='img-fluid mb-3' />
                    <p className='footer-text m-0'>&copy; 2021</p>
                    <p className='footer-text m-0'>Open Source Developers Group</p>
                    <p className='footer-text m-0'>International Institute of Information</p>
                    <p className='footer-text m-0'>Technology, Hyderabad</p>
                </div>
                <div className='d-flex flex-column justify-content-center order-1 order-sm-2 col-3 col-md-3 my-3'>
                    <div className="d-flex flex-row  justify-content-center">
                        <h2 className='social-link mx-2' onClick={() => { window.open('https://www.facebook.com/groups/185567594878116', '_blank') }}><FontAwesomeIcon icon={faFacebook} /></h2>
                        <h2 className='social-link mx-2' onClick={() => { window.open('https://github.com/OSDG-IIITH', '_blank') }}><FontAwesomeIcon icon={faGithub} /></h2>
                        <h2 className='social-link mx-2' onClick={() => { window.open('https://www.linkedin.com/company/74330374', '_blank') }}><FontAwesomeIcon icon={faLinkedin} /></h2>
                        <h2 className='social-link mx-2' onClick={() => { window.open('https://www.instagram.com/osdg.iiith', '_blank') }}><FontAwesomeIcon icon={faInstagram} /></h2>
                    </div>
                </div>
                <div className='col-2 d-flex my-3 text-end order-sm-3 d-none d-sm-block'>
                    <p className='m-0'>Reach Us</p>
                    <a className='footer-text my-1 d-block' href="mailto:osdg@students.iiit.ac.in">osdg@students.iiit.ac.in</a>
                </div>
                <div className="d-block d-sm-none text-center pb-3">
                    <p className="">Reach Us</p>
                    <a className='footer-text my-1 d-block' href="mailto:osdg@students.iiit.ac.in">osdg@students.iiit.ac.in</a>
                </div>
            </div>
        </footer >

    );

}

export default Footer;