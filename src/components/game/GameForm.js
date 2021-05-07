import React, { useContext, useState, useEffect } from "react"
import { GameContext } from "./GameProvider.js"
import { useHistory, useParams } from 'react-router-dom'
import { Multiselect } from 'multiselect-react-dropdown'


export const GameForm = () => {
    const history = useHistory()
    const { createGame, getCategories, categories, getGameById, updateGame } = useContext(GameContext)
    const {gameId} = useParams()
    const [currentGame, setCurrentGame] = useState({
        title: "",
        description:"",
        designer:"",
        year:0,
        age:0,
        players:0,
        time:0,
        category_set: []
    })
    useEffect(() => {
        getCategories().then(()=>{
            if(gameId){
                getGameById(gameId).then(setCurrentGame)
            }
        })
    }, [])

    const handleInputChange = (e) => {
        const tempGame = {...currentGame}
        tempGame[e.target.name] = e.target.value
        setCurrentGame(tempGame)
    }
    const handleSelectChosen = (e) => {
        const tempGame = {...currentGame}
        tempGame.category_set = e
        setCurrentGame(tempGame)
    }

    return (
        <form className="gameForm">
            {console.log(currentGame)}
            <h2 className="gameForm__title">Register New Game</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Title: </label>
                    <input type="text" name="title" required autoFocus className="form-control"
                        value={currentGame.title}
                        onChange={handleInputChange}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Description: </label>
                    <input type="text" name="description" required className="form-control"
                        value={currentGame.description}
                        onChange={handleInputChange}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="designer">Designer: </label>
                    <input type="text" name="designer" required className="form-control"
                        value={currentGame.designer}
                        onChange={handleInputChange}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="year">Year: </label>
                    <input type="number" name="year" required className="form-control"
                        value={currentGame.year}
                        onChange={handleInputChange}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="age">Age: </label>
                    <input type="number" name="age" required className="form-control"
                        value={currentGame.age}
                        onChange={handleInputChange}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="players">Number of Players: </label>
                    <input type="number" name="players" required className="form-control"
                        value={currentGame.players}
                        onChange={handleInputChange}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="time">Time: </label>
                    <input type="number" name="time" required autoFocus className="form-control"
                        value={currentGame.time}
                        onChange={handleInputChange}
                    />
                </div>
            </fieldset>
            
            <fieldset>
                <div className="form-group">
                    <label htmlFor="game_type_id">GameType: </label>
                    <Multiselect options={categories} selectedValues={currentGame.category_set} displayValue="name" onSelect={handleSelectChosen} onRemove={handleSelectChosen}></Multiselect>
                </div>
            </fieldset>


            {/* You create the rest of the input fields for each game property */}

            <button type="submit"
                onClick={evt => {
                    // Prevent form from being submitted
                    evt.preventDefault()

                    const game = {
                        name: currentGame.name,
                        gameTypeId: parseInt(currentGame.game_type_id)
                    }
                    // Send POST request to your API
                    if(gameId){
                        const game = {
                            id: currentGame.id,
                            title: currentGame.title,
                            description:currentGame.description,
                            designer:currentGame.designer,
                            year:parseInt(currentGame.year),
                            age:parseInt(currentGame.age),
                            players:parseInt(currentGame.players),
                            time:parseInt(currentGame.time),
                            categories: currentGame.category_set.map(c => c.id)
                    }
                        updateGame(game).then(() => history.push("/"))
                    }else{
                        const game = {
                                title: currentGame.title,
                                description:currentGame.description,
                                designer:currentGame.designer,
                                year:parseInt(currentGame.year),
                                age:parseInt(currentGame.age),
                                players:parseInt(currentGame.players),
                                time:parseInt(currentGame.time),
                                categories: currentGame.category_set.map(c => c.id)
                        }
                        createGame(game).then(() => history.push("/"))
                    }
                }}
                className="btn btn-primary">{gameId?"Edit":"Create"}</button>
        </form>
    )
}