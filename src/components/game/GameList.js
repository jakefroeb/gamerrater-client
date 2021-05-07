import React, { useContext, useEffect } from "react"
import { Link, useHistory } from "react-router-dom"
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
                        <h3 className="game__name">
                            <Link to={`/games/detail/${game.id}`}>
                                { game.title }
                            </Link>
                        </h3>
                    </section>
                })
            }
        </article>
    )
}