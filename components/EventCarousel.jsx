import { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDay } from "@fortawesome/free-solid-svg-icons";
import Flickity from 'react-flickity-component';

const EventCard = ({ eventData }) => {

    return (
        <div className="d-flex flex-row align-items-center event-card">
            <div className="card" style={{ width: "22rem", backgroundColor: "transparent", border: "none" }}>
                <img src={eventData.image} className="img-fluid event-card-image" />
                <div className="acrylic text-center pb-1" style={{ borderRadius: "7px", marginTop: "-4rem", paddingTop: "3rem" }}>
                    <h4>
                        {eventData.title}
                    </h4>
                    <span className="event-date"><FontAwesomeIcon icon={faCalendarDay} /> {eventData.date}</span>
                    <p className="event-desc mt-3 px-3">{eventData.description}</p>
                </div>
            </div>
        </div>
    );
};


const EventCarousel = ({ eventList, setSelectedEvent }) => {

    const carousel = useRef();

    useEffect(() => {
        carousel.current.on('change', () => {
            setSelectedEvent(carousel.current.selectedIndex);
        });
    }, [])

    const flickityOptions = {
        initialIndex: 3,
        wrapAround: true,
        pageDots: true,
        draggable: false
    }

    return (
        <>
            <Flickity
                className={'carousel'} // default ''
                elementType={'div'} // default 'div'
                options={flickityOptions} // takes flickity options {}
                disableImagesLoaded={false} // default false
                static // default false
                flickityRef={c => carousel.current = c}
            >
                {eventList.map((e, i) => <EventCard key={i} eventData={e} />)}
            </Flickity>
        </>
    );

};

export default EventCarousel;