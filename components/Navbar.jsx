import Link from 'next/link';

const Navbar = () => {

    return (
        <nav className="navbar navbar-expand-lg navbar-dark fixed-top">
            <div className="container-fluid py-2">
                <img src="/Images/BrandLogo.png" height="30" className='ps-0' />
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav ms-auto">
                        <Link href="/"><a className="nav-link ms-3 active">Home</a></Link>
                        <Link href="/projects"><a className="nav-link ms-3 active">Projects</a></Link>
                        <Link href="/events"><a className="nav-link ms-3 active">Events</a></Link>
                        <Link href="/team"><a className="nav-link ms-3 active">Team</a></Link>
                        {/* <Link href="/qbhacks"><a className="nav-link ms-3 active">QBHacks</a></Link> */}
                        {/* <Link href="/#contact-form-scroll-point"><button className=" btn-custom ms-3 px-3 pt-1">Contact Us</button></Link> */}
                    </div>
                </div>
            </div >
        </nav >
    );

};

export default Navbar;