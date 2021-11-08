import React, { useState, useEffect } from "react"
import { useHistory } from "react-router-dom"
import { getGames } from "../Game/GameManager"
import { getEvents } from "./EventManager"


export const EventForm = () => {
    const history = useHistory()

    const [currentEvent, setEvent] = useState({})

    useEffect(() => {
        // TODO: Get all existing games from API
        getGames().then(data => setEvent(data))
    }, [])

    const changeEventState = (domEvent) => {
        // TODO: Complete the onChange function
        const eventCopy = { ...currentEvent }
        eventCopy[domEvent.target.name] = domEvent.target.value
        changeEventState(eventCopy)
    }
    }

    return (
        <form className="gameForm">
            <h2 className="gameForm__title">Schedule New Event</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="gameId">Game: </label>
                    <select name="gameId" className="form-control"
                        value={currentEvent.gameId}
                        onChange={changeEventState}>
                        <option value="0">Select a game...</option>
                        {
                                currentEvent.map(event => <option value={event.id}>{event.label}</option>)
                        }
                    </select>
                </div>
            </fieldset>

            {/* TODO: Create the rest of the input fields */}

            <button type="submit"
                onClick={evt => {
                    evt.preventDefault()
                    const event = {
                        game: currentEvent.game,

                    }

                    // TODO: Call the createEvent function and pass it the event object


                    // TODO: Once event is created, redirect user to event list
                }}
                className="btn btn-primary">Create Event</button>
        </form>
    )
}
