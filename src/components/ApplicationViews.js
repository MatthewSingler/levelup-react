import React from "react"
import { Route } from "react-router-dom"
import { GameList } from "./Game/GameList.js"
import { EventList } from "./Events/EventList.js"
import { GameForm } from "./Game/GameForm.js"
import { EventForm } from "./Events/EventForm.js"
import { Profile } from "./profile/profile.js"

export const ApplicationViews = () => {
    return <>
        <main style={{
            margin: "5rem 2rem",
            lineHeight: "1.75rem"
        }}>
            <Route exact path="/games">
                <GameList />
            </Route>
            <Route exact path="/events">
                <EventList />
            </Route>
            <Route exact path="/game/new">
                <GameForm />
            </Route>
            <Route exact path="/game/edit/:gameId">
                <GameForm />
            </Route>
            <Route exact path="/event/new">
                <EventForm />
            </Route>
            <Route exact path="/profile">
                <Profile />
            </Route>
        </main>
    </>
}
