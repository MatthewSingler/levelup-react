import React, { useState, useEffect } from "react"
import { useHistory, useParams } from 'react-router-dom'
import { createGame, getGame, getGameTypes, updateGameFetch } from './GameManager.js'


export const GameForm = () => {
    const history = useHistory()
    const [gameTypes, setGameTypes] = useState([])

    const [currentGame, setCurrentGame] = useState({
        skillLevel: 1,
        numberOfPlayers: 0,
        title: "",
        maker: "",
        gameTypeId: 0
    })
    /*get the game they are selecting. See if the parameters has a game id in it*/
    const { gameId } = useParams()
    const game =currentGame
    /*make a useEffect that is checking for changes to the game Id var*/
    useEffect(() => {
        if (gameId) {
            getGame(gameId).then((gameData) => setCurrentGame({
                ...gameData,
                skillLevel: gameData.skill_level,
                numberOfPlayers: gameData.number_of_players,
                gameTypeId: gameData.game_type.id
            }))
        }
    }, [gameId])

    useEffect(() => {
    getGameTypes().then(typesData => setGameTypes(typesData))
    }, [])

    const handleOnChange = (event) => {
        const copyGame = { ...currentGame }
        copyGame[event.target.name] = event.target.value
        setCurrentGame(copyGame)
    }
    const updateGame = (evt) => {
        updateGameFetch(game).then(() => {
            history.push('/games')
        })
    }
    const saveGame = (evt) => {
        evt.preventDefault()
        createGame(game).then(() => {
            history.push("/games")
        })
    }


    /*
        REFACTOR CHALLENGE START

        Can you refactor this code so that all property
        state changes can be handled with a single function
        instead of five functions that all, largely, do
        the same thing?

        One hint: [event.target.name]
    */
    /*const changeGameTitleState = (event) => {
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
    }*/
    /* REFACTOR CHALLENGE END */

    return (
        <> 
            <label>Title</label>
            <input type="text" name="title" value={game.title}onChange={(event) => handleOnChange(event)}></input>
            <label>Maker</label>
            <input type="text" name="maker" value={game.maker} onChange={(event) => handleOnChange(event)}></input>
            <label>Number of Players</label>
            <input type="number" name="numberOfPlayers" value={game.numberOfPlayers} onChange={(event) => handleOnChange(event)}></input>
            <label>Skill Level</label>
            <input type="number" name="skillLevel" value={game.skillLevel} onChange={(event) => handleOnChange(event)}></input>
            <label>Game Type</label>
            <select name="gameTypeId" value={game.gameTypeId} onChange={(event) => handleOnChange(event)}>
                <option value="0">Select a game type</option>
                {
                    gameTypes.map(type => <option value={type.id}>{type.label}</option>)
                }
            </select>

            <button
                onClick={evt => {
                    evt.preventDefault()
                    if (gameId) {
                        updateGame()
                    } else {
                        saveGame(evt)
                    }
                    const game = {
                        maker: currentGame.maker,
                        title: currentGame.title,
                        numberOfPlayers: parseInt(currentGame.numberOfPlayers),
                        skillLevel: parseInt(currentGame.skillLevel),
                        gameTypeId: parseInt(currentGame.gameTypeId)
                    }
                }}
                className="btn btn-primary">{gameId ? 'Update' : 'Create'}</button>
        </>
    )
}
