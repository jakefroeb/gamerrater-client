import React, { useContext, useEffect } from "react"
import { Link, useHistory } from "react-router-dom"
import { Button } from "reactstrap"
import { GameContext } from "./GameProvider.js"

export const GameList = (props) => {
    const { games, getGames } = useContext(GameContext)
    const history = useHistory()

    useEffect(() => {
        getGames()
    }, [])

    return (
        <article className="games">
            <Button color="success" onClick={() => {
                history.push({ pathname: "/games/new" })}}
            >Register New Game</Button>
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