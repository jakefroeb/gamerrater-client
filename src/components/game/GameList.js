import React, { useContext, useEffect } from "react"
import { useHistory } from "react-router-dom"
import { GameContext } from "./GameProvider.js"

export const GameList = (props) => {
    const { games, getGames, deleteGame } = useContext(GameContext)
    const history = useHistory()

    useEffect(() => {
        getGames()
    }, [])

    return (
        <article className="games">
            <button className="btn btn-2 btn-sep icon-create" onClick={() => {
                history.push({ pathname: "/games/new" })}}
            >Register New Game</button>
            {
                games?.map(game => {
                    return <section key={`game--${game.id}`} className="game">
                        <div className="game__title"><h2>{game.title}</h2></div>
                        <div className="game__creator">user : {game.creator.first_name} {game.creator.last_name}</div>
                        <div className="game__description">description : {game.description}</div>
                        <div className="game__designer">designer : {game.designer}</div>
                        <div className="game__year">year : {game.year}</div>
                        <div className="game__players">players : {game.players}</div>
                        <div className="game__age">age : {game.age}</div>
                        <div className="game__time">time : {game.time}</div>
                        <div className="game__type">
                            <h4>Categories</h4>
                            <ul>
                                {game.category_set.map(c => {
                                    return <li>{c.name}</li>
                                })}
                            </ul> </div>
                        <button className="editButton" onClick = {() => {
                            history.push({ pathname: `/games/edit/${game.id}`})
                        }}>edit</button>
                        <button className="delete_button" onClick={()=>{
                            deleteGame(game.id)
                        }}>delete</button>
                    </section>
                })
            }
        </article>
    )
}