import "./home.styles.css";
import React from "react";
import NavBar from "../../components/navbar/navbar.component";
import CardsContainer from "../../components/cardsContainer/cardsContainer.component";
import Card from "../../components/card/card.component";
import Paginado from "../../components/paginado/paginado.component";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getGames, getGenres, filterByGenres, filterBySource } from "../../redux/actions/index";
import { connect } from "react-redux";

function Home(){
    const dispatch = useDispatch();
    const allGames = useSelector(state => state.allGames);
    const games = useSelector(state => state.games);
    const allGenres = useSelector(state => state.genres);
    const [order, setOrder] = useState('AtoZ');

    const handleNameSort = () => {
      setOrder(order === 'AtoZ' ? 'ZtoA' : 'AtoZ');
    };

    const handleRatingSort = () => {
        setOrder(()=>{if (order !== 'ratingAsc' && order !== 'ratingDesc') {
          return 'ratingDesc';
        } else if (order === 'ratingAsc') {
          return 'ratingDesc';
        } else if (order === 'ratingDesc') {
          return 'ratingAsc';
        }
        });
    }
    

    
    useEffect(() => {
        dispatch(getGames());
        dispatch(getGenres())
    },[dispatch])
    
    const handleClick = (e) => {
        e.preventDefault();
        dispatch(getGames());
    }
    
    const handleFilterByGenres = (selectedGenre) =>{
        dispatch(filterByGenres(selectedGenre));
    }

    const handleFilterBySource = (selectedSource) =>{
        console.log(selectedSource);
        dispatch(filterBySource(selectedSource));
    }

    return(
        <div>
            <NavBar allGenres={allGenres} handleFilteredGenres={handleFilterByGenres} handleNameSort={handleNameSort} handleRatingSort={handleRatingSort} handleFilterBySource={handleFilterBySource}/>
            <Link to="/game">crear juego
            <button onClick={e=>{handleClick(e)}}>load all games</button>
            </Link>
            {/* <Paginado gamesPerPage={gamesPerPage} allGames={allGames.length} setCurrentPage={setCurrentPage}/> */}
            <CardsContainer allGames ={allGames} games={games} order={order}/>
            
        </div>
    )
}

export default connect(null, null)(Home);