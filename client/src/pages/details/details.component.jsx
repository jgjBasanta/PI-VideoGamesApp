import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getGameByID } from "../../redux/actions";
import { useParams } from "react-router-dom";


function Details() {
    const dispatch = useDispatch();
    const { id } = useParams();
    const game = useSelector(state => state.gameDetails);
    useEffect(() => {
        dispatch(getGameByID(Number(id)))
    }, [id])
    console.log(useParams());
    return(
        <div>
            <h1>{game.name}</h1>
            <img src={game.image} alt="" />
            <p>{game.platforms}</p>
            <p>{game.description}</p>
            <p>{game.released}</p>
            <p>Rating: {game.rating}</p>
            <p>{game.genres}</p>
        </div>
    ) 
}

export default Details;