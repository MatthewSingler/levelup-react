import React, { useEffect, useState } from "react"
import { getEvents, joinEvent, leaveEvent } from "./EventManager"
import { useHistory } from "react-router"

export const EventList = (props) => {
    const [events, setEvents] = useState([])
    const history = useHistory()

    /*useEffect(() => {
        getEvents().then(data => setEvents(data))
    }, [])*/
    const eventFetcher = () => {
        getEvents()
            .then(data => setEvents(data))
    }

    useEffect(() => {
        eventFetcher()
    }, [])

    return (
        <article className="events">
            {
                events.map(event => {
                    return <section key={`event--${event.id}`} className="event">
                        <h3>Event</h3>
                        <div className="event__game">{event.game.title}</div>
                        <div className="event__organizer">organized by {event.organizer.bio}</div>
                        <div className="event__description">Described as: {event.description}</div>
                        <div className="event__date">Taking place on {event.date}</div>
                        <div className="event__time">at {event.time}</div>
                        <br>
                        </br>
                        {
                            event.joined
                                ? <button className="btn btn-3"
                                    onClick={() => leaveEvent(event.id).then(() => eventFetcher())}
                                >Leave</button>
                                : <button className="btn btn-2"
                                    onClick={() => joinEvent(event.id).then(() => eventFetcher())}
                                >Join</button>
                        }
                    </section>
                })
            }
            <button className="btn btn-2 btn-sep icon-create"
                onClick={() => { history.push({ pathname: "/event/new" }) }}>Register New Event</button>
        </article>
    )
}