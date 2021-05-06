import React, { useState } from "react"

export const GameContext = React.createContext()

export const GameProvider = (props) => {
    const [ games, setGames ] = useState([])
    const [ categories, setCategories ] = useState([])
    const deleteGame = (gameId) => {
        return fetch(`http://localhost:8000/games/${gameId}`, {
            method:"DELETE",
            headers:{
                "Authorization": `Token ${localStorage.getItem("lu_token")}`
            }
        })
        .then(getGames)
    }
    const getGames = () => {
        return fetch("http://localhost:8000/games", {
            headers:{
                "Authorization": `Token ${localStorage.getItem("lu_token")}`
            }
        })
            .then(response => response.json())
            .then(setGames)
    }
    const getGameById = (gameId) => {
        return fetch(`http://localhost:8000/games/${gameId}`, {
            headers:{
                "Authorization": `Token ${localStorage.getItem("lu_token")}`
            }
        })
            .then(response => response.json())
    }
    const createGame = (game) => {
        return fetch("http://localhost:8000/games", { 
            method:"POST",
            headers:{
                "Authorization": `Token ${localStorage.getItem("lu_token")}`,
                "Content-Type" : "application/json"
            },
            body : JSON.stringify(game)
        })
            .then(getGames)
    }
    const getCategories = () => {
        return fetch("http://localhost:8000/categories", {
            headers:{
                "Authorization": `Token ${localStorage.getItem("lu_token")}`
            }
         })
            .then(res => res.json())
            .then(setCategories)
    }
    const updateGame = (game) => {
        return fetch(`http://localhost:8000/games/${game.id}`,{
            method:"PUT",
            headers:{
                "Authorization": `Token ${localStorage.getItem("lu_token")}`,
                "Content-Type":"application/json"
            },
            body: JSON.stringify(game)
        })
        .then(getGames)
    }


    return (
        <GameContext.Provider value={{ games, getGames, createGame, getCategories, categories, getGameById, deleteGame, updateGame }} >
            { props.children }
        </GameContext.Provider>
    )
}