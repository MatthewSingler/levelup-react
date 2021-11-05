import React, { useEffect, useState } from "react"
import { getEvents } from "./EventManager"

export const EventList = (props) => {
    const [events, setEvents] = useState([])

    useEffect(() => {
        getEvents().then(data => setEvents(data))
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
                        <div className="event__date">taking place on {event.date}</div>
                        <div className="event__time">at {event.time}</div>
                        <br>
                        </br>
                    </section>
                })
            }
        </article>
    )
}