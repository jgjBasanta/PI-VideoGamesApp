import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getGameByID } from "../../redux/actions";
import { useParams, Link } from "react-router-dom";
import './details.styles.css';


function Details() {
    const dispatch = useDispatch();
    const { id } = useParams();
    const game = useSelector(state => state.gameDetails);
    useEffect(() => {
        dispatch(getGameByID(id))
    }, [id])
    console.log(useParams());
    console.log(game);
    return(
        <div className="details-container">
            <div className="details-navbar-container">
                <div className='page-name-container'>
                    <Link className='create-link' to='/home'>
                        <button className='page-name'>IVGDB</button>
                    </Link>
                </div>
                <div className="go-create-container">
                    <Link className="create-link" to="/create">
                        <button className='details-go-create-button'>Add Game</button>
                    </Link>
                </div>
            </div>
            <div className="details-name-container">
                <h1 className="details-name">{game.name}</h1>
            </div>
            <div className="details-image-container">
                <img className="details-image" src={game.image} alt="" />
            </div>
            <div className="details-platforms-container">
                <p>Platforms: </p>
                {
                    game.platforms?.map((platform, index) => (
                        <p key={index} className="details-platforms">{platform} </p>
                    ))
                }
            </div>
            <div className="details-description-container">
                <p className="details-description">{game.description}</p>
            </div>
            <div className="details-released-container">
                <p>Released: {game.released}</p>
            </div>
            <div className="details-rating-container">
                <p>Rating: {game.rating} / 5</p>
            </div>
            <div className="details-genres-container">
                {game.genres?.map((genre) => (
                        <p className="details-genres" key={genre.id}>{genre.name}</p>
                    ))
                }
            </div>

        </div>
    ) 
}

export default Details;