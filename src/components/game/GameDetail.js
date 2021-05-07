import { useContext, useEffect, useState } from "react"
import { useHistory, useParams } from "react-router-dom"
import { GameContext } from "./GameProvider"

export const GameDetail = () => {
    const history = useHistory()
    const {getGameById, deleteGame} = useContext(GameContext)
    const [currentGame, setCurrentGame] = useState({
        title: "",
        description:"",
        designer:"",
        year:0,
        age:0,
        players:0,
        time:0,
        creator:{},
        category_set: []
    })
    const {gameId} = useParams()
    useEffect(()=>{
        getGameById(gameId).then(setCurrentGame)
    },[])
    return (
        <article className="games">
            {console.log(currentGame)}
            <h2>{currentGame.title}</h2>
            <div className="game__creator">user : {currentGame.creator?.first_name} {currentGame.creator?.last_name}</div>
            <div className="game__description">description : {currentGame.description}</div>
            <div className="game__designer">designer : {currentGame.designer}</div>
            <div className="game__year">year : {currentGame.year}</div>
            <div className="game__players">players : {currentGame.players}</div>
            <div className="game__age">age : {currentGame.age}</div>
            <div className="game__time">time : {currentGame.time}</div>
            <div className="game__type">
            <h4>Categories</h4>
            <ul>
                {currentGame.category_set.map(c => {
                return <li>{c.name}</li>
                })}
            </ul> </div>
            <button className="editButton" onClick = {() => {
                history.push({ pathname: `/games/edit/${currentGame.id}`})
                }}>edit</button>
            <button className="delete_button" onClick={()=>{
                deleteGame(currentGame.id)
                }}>delete</button>
        </article>
    )
}