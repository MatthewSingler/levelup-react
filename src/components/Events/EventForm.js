import React, { useState, useEffect } from "react"
import { useHistory } from "react-router-dom"
import { getGames } from "../Game/GameManager"
import { getEvents, createEvent } from "./EventManager"


export const EventForm = () => {
    const history = useHistory()
    const [currentEvent, setEvent] = useState({})
    const [games, setGames] = useState([])

    useEffect(() => {
        getGames().then(data => setGames(data))
    }, [])

    const changeEventState = (domEvent) => {
        const eventCopy = { ...currentEvent }
        eventCopy[domEvent.target.name] = domEvent.target.value
        setEvent(eventCopy)
    }

    return (
        <>
            <h2 className="gameForm__title">Schedule New Event</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="game">Game: </label>
                    <select name="game" className="form-control"
                        value={currentEvent.gameId}
                        onChange={changeEventState}>
                        <option value="0">Select a game...</option>
                        {
                            games.map(game => <option value={game.id}>{game.title}</option>)
                        }
                    </select>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Description: </label>
                    <input value={currentEvent.description} type="text" onChange={changeEventState} name="description"></input>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="time">Time </label>
                    <input value={currentEvent.time} type="text" onChange={changeEventState} name="time"></input>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="date">Date </label>
                    <input value={currentEvent.date} type="text" onChange={changeEventState} name="date"></input>
                </div>
            </fieldset>

            <button onClick={evt => {
                evt.preventDefault()
                const event = {
                    game: currentEvent.game,
                    description: currentEvent.description,
                    date: currentEvent.date,
                    time: currentEvent.time,
                    organizer: currentEvent.gamer,
                    attendees: currentEvent.attendees
                }
                createEvent(event)
                    .then(() => history.push("/events"))
            }}
                className="btn btn-primary">Create Event</button>
        </>
    )
}