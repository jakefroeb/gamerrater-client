import React, { useContext, useEffect, useState } from "react"
import { Link, useHistory } from "react-router-dom"
import { Button } from "reactstrap"
import { GameContext } from "./GameProvider.js"

export const GameList = (props) => {
    const { games, getGames, searchGames, sortGames} = useContext(GameContext)
    const [searchTerm, setSearchTerm] = useState("")
    const [sort, setSort] = useState("")
    const history = useHistory()

    useEffect(() => {
        getGames()
    }, [])
    useEffect(()=>{
        if(searchTerm.length){
            searchGames(searchTerm)
        }
    },[searchTerm])

    return (
        <article className="games">
            <label htmlFor="searchTerm">Search: </label>
            <input type="text" name="searchTerm" autoFocus className="form-control"
                                value={searchTerm}
                                onChange={(e)=> {
                                    setSearchTerm(e.target.value)
                                    }}/>
            <select name="sort_query" className="form-control"
                        value={sort}
                        onChange={(e)=> setSort(e.target.value)}>
                        <option value="0">Sort Game By ...</option>
                        <option value="year">Year</option>
                        <option value="time">Time</option>
                        <option value="designer">Designer</option>
            </select>
            <Button color="info" onClick={() => sortGames(sort)}
            >Sort Games</Button>
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