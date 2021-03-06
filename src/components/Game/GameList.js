import React, { useState, useEffect } from "react"
import { getGames } from "./GameManager.js"
import { useHistory, Link } from "react-router-dom"
export const GameList = (props) => {
    const [games, setGames] = useState([])
    const history = useHistory()

    useEffect(() => {
        getGames().then(data => setGames(data))
    }, [])

    return (
        <article className="games">
            <button className="btn btn-2 btn-sep icon-create"
                onClick={() => {history.push({ pathname: "/game/new" })}}>Register New Game</button>

            {
                games.map(game => {
                    return <section key={`game--${game.id}`} className="game">
                        <h3>Game</h3>
                        <div className="game__title">{game.title} Created by {game.maker}</div>
                        <div className="game__players">{game.number_of_players} players needed</div>
                        <div className="game__skillLevel">Skill level is {game.skill_level}</div>
                        <Link to={`game/edit/${game.id}`}>Edit Game</Link>
                        <br>
                        </br>
                    </section>
                })
            }
        </article>
    )
}
