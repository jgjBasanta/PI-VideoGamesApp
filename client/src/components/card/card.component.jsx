import '../card/card.styles.css';
import {Link} from "react-router-dom";

const Card = ({ name, image, genres, id})=>{
    const gameID = id;
    console.log(gameID);
    return(
        <div className='game-card'>
            <Link className='card-details-link' to={`/details/${gameID}`}>
                <div className='game-image-container'>
                    <img className='game-image' src={image} alt="" />
                </div>
                <div className='card-info-container'>
                    <div className='game-name-container'>
                        <h1 className='game-name'>{name}</h1>
                    </div>
                    <div className='game-genres-container'>
                        <p className='game-genres'>{genres[0]}</p>
                        <p>-</p>
                        <p className='game-genres'>{genres[1]}</p>
                    </div>
                </div>
            </Link>
        </div>
    )
};
export default Card; 