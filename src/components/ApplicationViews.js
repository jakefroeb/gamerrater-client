import React from "react"
import { Route } from "react-router-dom"
import { GameForm } from "./game/GameForm"
import { GameList } from "./game/GameList"
import { GameProvider } from "./game/GameProvider"

export const ApplicationViews = () => {
    return <>
        <main style={{
            margin: "5rem 2rem",
            lineHeight: "1.75rem"
        }}>
            <GameProvider>
                <Route exact path="/">
                    <GameList />
                </Route>
                <Route exact path="/games/new">
                    <GameForm />
                </Route>
                <Route exact path="/games/edit/:gameId(\d+)">
                    <GameForm/>
                </Route>
            </GameProvider>
            
        </main>
    </>
}