import React, { useState } from "react"

export const ReviewContext = React.createContext()

export const ReviewProvider = (props) =>{
    const [reviews, setReviews] = useState([])

    const getReviews = (gameId) => {
        return fetch(`http://localhost:8000/reviews?gameId=${gameId}`, {
            headers:{
                "Authorization": `Token ${localStorage.getItem("lu_token")}`
            }
        })
            .then(response => {
                if(response.ok){
                    return response.json()
                }
                else{
                    return []
                }
            })
            .then(setReviews)
    }
    const createReview = (review) => {
        return fetch(`http://localhost:8000/reviews`,{
            method:"POST",
            headers:{
                "Authorization": `Token ${localStorage.getItem("lu_token")}`,
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(review)
        })
        .then(()=>getReviews(review.game))
    }
    const deleteReview = (reviewId, gameId) => {
        return fetch(`http://localhost:8000/reviews/${reviewId}`,{
            method:"DELETE",
            headers:{
                "Authorization": `Token ${localStorage.getItem("lu_token")}`
            }
        })
        .then(getReviews(gameId))
    }
    const updateReview = (review) => {
        return fetch(`http://localhost:8000/reviews/${review.id}`,{
            method:"PUT",
            headers:{
                "Authorization": `Token ${localStorage.getItem("lu_token")}`,
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(review)
        })
        .then(getReviews(review.game.id))
    }
    
    return (
        <ReviewContext.Provider value={{getReviews, createReview, reviews, deleteReview, updateReview}} >
            { props.children }
        </ReviewContext.Provider>
    )
}