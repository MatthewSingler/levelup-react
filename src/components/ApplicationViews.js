import React from "react"
import { Route } from "react-router-dom"
import { GameList } from "./Game/GameList.js"
import { EventList } from "./Events/EventList.js"
import { GameForm } from "./Game/GameForm.js"

export const ApplicationViews = () => {
    return <>
        <main style={{
            margin: "5rem 2rem",
            lineHeight: "1.75rem"
        }}>
            <Route exact path="/">
                <GameList />
            </Route>
            <Route exact path="/events">
                <EventList />
            </Route>
            <Route exact path="/game/new">
                <GameForm />
            </Route>
        </main>
    </>
}
