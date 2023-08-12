import './navbar.styles.css';
import React from 'react';
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import { useEffect } from 'react';
import {getGames, getGenres} from "../../redux/actions/index";
import { filterGamesByGenres } from '../../redux/actions/index';

const NavBar = ({
    allGenres, 
    handleFilteredGenres, 
    handleNameSort, 
    handleRatingSort,
    handleFilterBySource,
})=>{
    const dispatch = useDispatch();

    return(
        <div className='navbar-container'>
            <select onChange={e => handleFilterBySource(e.target.value)} className='select-api-db'>
                <option value='all'>All Games</option>
                <option value='api'>API Games</option>
                <option value='db'>DB Games</option>
            </select>
            <div className='searchbar-container'>
                <form>
                    <input type='text' placeholder='Search' className='searchbar'/>
                    <input type='submit' className='search-button'/>
                </form>
            </div>
            <select onChange={e => handleFilteredGenres(e.target.value)} className='select-genres'>
                <option value={'All Genres'}>All Genres</option>
                {allGenres.map(genre => (
                    <option key={genre.id} value={genre.name}>{genre.name}</option>
                ))}
            </select>
            <button onClick={handleNameSort}>Ordenar por nombre</button>
            <button onClick={handleRatingSort}>Ordenar por rating</button>
            <div>
                <Link to="/create">
                    <button className='go-to-create-button'>Crear juego</button>
                </Link>
            </div>

        </div>
    )
};
export default NavBar; 