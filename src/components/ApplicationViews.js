import React from "react"
import { Route } from "react-router-dom"
import { GameDetail } from "./game/GameDetail"
import { GameForm } from "./game/GameForm"
import { GameList } from "./game/GameList"
import { GameProvider } from "./game/GameProvider"
import { ReviewProvider } from "./game/ReviewProvider"

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
                <ReviewProvider>
                    <Route exact path="/games/detail/:gameId(\d+)">
                        <GameDetail/>
                    </Route>
                </ReviewProvider>
            </GameProvider>
            
        </main>
    </>
}