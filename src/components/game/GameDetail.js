import React,{ useContext, useEffect, useState } from "react"
import { useHistory, useParams } from "react-router-dom"
import { GameContext } from "./GameProvider"
import { ReviewContext } from "./ReviewProvider"
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import StarRatings from 'react-star-ratings'

export const GameDetail = () => {
    
    const history = useHistory()
    const {getGameById, deleteGame} = useContext(GameContext)
    const {getReviews, reviews, createReview, deleteReview, updateReview} = useContext(ReviewContext)
    const [modalOpen, setModalOpen] = useState(false)
    const [currentGame, setCurrentGame] = useState({
        title: "",
        description:"",
        designer:"",
        year:0,
        age:0,
        players:0,
        time:0,
        creator:{},
        category_set: [],
    })
    const {gameId} = useParams()
    const [currentReview, setCurrentReview] = useState({
        title:"",
        review:"",
        rating:0,
        game:gameId
    })

    useEffect(()=>{
        getGameById(gameId).then(setCurrentGame)
    },[reviews])
    useEffect(()=>{
        getReviews(gameId)
    },[])
    const handleInputChange = (e) => {
        const tempReview = {...currentReview}
        tempReview[e.target.name] = e.target.value
        setCurrentReview(tempReview)
    }
    const handleRatingChange = (e) =>{
        const tempReview = {...currentReview}
        tempReview.rating = e
        setCurrentReview(tempReview)
    }

    return (
        <article className="game">
            <h2>{currentGame.title}</h2>
            <div className="game__creator">user : {currentGame.creator?.first_name} {currentGame.creator?.last_name}</div>
            <div className="game__description">description : {currentGame.description}</div>
            <div className="game__designer">designer : {currentGame.designer}</div>
            <div className="game__year">year : {currentGame.year}</div>
            <div className="game__players">players : {currentGame.players}</div>
            <div className="game__age">age : {currentGame.age}</div>
            <div className="game__time">time : {currentGame.time}</div>
            <h5>Average Rating : {currentGame.average_rating}</h5>
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
                deleteGame(currentGame.id).then(history.push("/"))
                }}>delete</button>
            <section className="reviews">
                <Button color="primary" onClick={e=>setModalOpen(true)}>Add Review</Button>
                <Modal isOpen={modalOpen}>
                    <ModalHeader>Add Review</ModalHeader>
                    <ModalBody>
                    <fieldset>
                        <div className="form-group">
                            <label htmlFor="title">Title: </label>
                            <input type="text" name="title" required autoFocus className="form-control"
                                value={currentReview.title}
                                onChange={handleInputChange}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="review">Review: </label>
                            <input type="textfield" name="review" required className="form-control"
                                value={currentReview.review}
                                onChange={handleInputChange}/>
                        </div>
                        <StarRatings
                            rating={currentReview.rating}
                            starRatedColor="blue"
                            changeRating={handleRatingChange}
                            numberOfStars={6}
                            name='rating'/>
                    </fieldset>
                    </ModalBody>
                    <ModalFooter>
                        {currentReview.id ? <Button color="primary" onClick={e => updateReview(currentReview).then(setModalOpen(false))}>Submit</Button>
                        : <Button color="primary" onClick={e => createReview(currentReview).then(setModalOpen(false))}>Submit</Button>}
                        <Button color="secondary" onClick={e=>setModalOpen(false)}>Close</Button>
                    </ModalFooter>
                </Modal>
                {reviews?.map(r=>{
                    return(
                        <article className="review">
                            <h3>{r.title}</h3>
                            <div className="review__creator">user : {r.user?.first_name} {r.user?.last_name}</div>
                            <div className="review__rating">rating : {r.rating}</div>
                            <div className="review__review">review : {r.review}</div>
                            {parseInt(localStorage.getItem("userId")) === r.user.id ? 
                                <>
                                <Button color="warning" onClick={e=>{
                                    setModalOpen(true)
                                    setCurrentReview(r)
                                }
                                }>Edit</Button>
                                <Button color="danger" onClick={e=>{
                                    e.preventDefault()
                                    deleteReview(r.id,gameId)}
                                    }>Delete</Button>
                                </>
                                :<></>
                                }
                        </article>
                    )
                })}
            </section>
        </article>
    )
}