import React, { useState, useEffect } from "react"
import { useHistory } from 'react-router-dom'
import { createGame, getGameTypes } from './GameManager.js'


export const GameForm = () => {
    const history = useHistory()
    const [gameTypes, setGameTypes] = useState([])

    /*
        Since the input fields are bound to the values of
        the properties of this state variable, you need to
        provide some default values.
    */
    useEffect(() => {
    getGameTypes().then(typesData => setGameTypes(typesData))
    })

    const handleOnChange = (event) => {
        const copy = { ...game }
        copyGame[event.target.name] = event.target.value
        setState(copyGame)
    }
    const saveGame = (event) => {
        event.preventDefault()
        createGame(game).then(() => {
            history.push('/')
        })
    }

    const [currentGame, setCurrentGame] = useState({
        skillLevel: 1,
        numberOfPlayers: 0,
        title: "",
        maker: "",
        gameTypeId: 0
    })

    /*
        REFACTOR CHALLENGE START

        Can you refactor this code so that all property
        state changes can be handled with a single function
        instead of five functions that all, largely, do
        the same thing?

        One hint: [event.target.name]
    */
    const changeGameTitleState = (event) => {
        const newGameState = { ...currentGame }
        newGameState.title = event.target.value
        setCurrentGame(newGameState)
    }

    const changeGameMakerState = (event) => {
        const newGameState = { ...currentGame }
        newGameState.maker = event.target.value
        setCurrentGame(newGameState)
    }

    const changeGamePlayersState = (event) => {
        const newGameState = { ...currentGame }
        newGameState.numberOfPlayers = event.target.value
        setCurrentGame(newGameState)
    }

    const changeGameSkillLevelState = (event) => {
        const newGameState = { ...currentGame }
        newGameState.skillLevel = event.target.value
        setCurrentGame(newGameState)
    }

    const changeGameTypeState = (event) => {
        const newGameState = { ...currentGame }
        newGameState.gameTypeId = event.target.value
        setCurrentGame(newGameState)
    }
    /* REFACTOR CHALLENGE END */

    return (
        <form className="gameForm">
            <label>Title</label>
            <input type="text" name="title" onChange={(event) => handleOnChange(event)}></input>
            <label>Maker</label>
            <input type="text" name="maker" onChange={(event) => handleOnChange(event)}></input>
            <label>Number of Players</label>
            <input type="number" name="numberOfPlayers" onChange={(event) => handleOnChange(event)}></input>
            <label>Skill Level</label>
            <input type="number" name="skillLevel" onChange={(event) => handleOnChange(event)}></input>
            <label>Game Type</label>
            <select name="gameTypeId" onChange={(event) => handleOnChange(event)}>
                <option value="0">Select a game type</option>
                {
                    gameTypes.map(type => <option value={type.id}>{type.label}</option>)
                }
            </select>
            <button onClick={(event) => saveGame(event)}>Save Game</button>
            <h2 className="gameForm__title">Register New Game</h2>


            {/* TODO: create the rest of the input fields */}

            <button type="submit"
                onClick={evt => {
                    // Prevent form from being submitted
                    evt.preventDefault()

                    const game = {
                        maker: currentGame.maker,
                        title: currentGame.title,
                        numberOfPlayers: parseInt(currentGame.numberOfPlayers),
                        skillLevel: parseInt(currentGame.skillLevel),
                        gameTypeId: parseInt(currentGame.gameTypeId)
                    }

                    // Send POST request to your API
                    createGame(game)
                        .then(() => history.push("/games"))
                }}
                className="btn btn-primary">Create</button>
        </form>
    )
}
