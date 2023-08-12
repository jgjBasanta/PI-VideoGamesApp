import '../card/card.styles.css';
import {Link} from "react-router-dom";

const Card = ({ name, image, genres, id})=>{
    const gameID = id;
    console.log(gameID);
    return(
        <Link to={`/details/${gameID}`}>
            <div className='game-card'>
                <img className='game-image' src={image} alt="" />
                <p className='game-name'>{name}</p>
                <p className='game-genres'>genre:{genres}</p>
            </div>
        </Link>
    )
};
export default Card; 