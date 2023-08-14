import './navbar.styles.css';
import React from 'react';
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import { useEffect, useState } from 'react';
import {getGames, getGenres} from "../../redux/actions/index";
import {  getGamesByName } from '../../redux/actions/index';

const NavBar = ({
    allGenres, 
    handleFilteredGenres, 
    handleNameSort, 
    handleRatingSort,
    handleFilterBySource,
})=>{
    const dispatch = useDispatch();
    const [ name, setName ] = useState("");

    function handleSearchChange(e){
        e.preventDefault();
        setName(e.target.value);
        console.log(name)
    }

    function handleSubmit(e){
        e.preventDefault();
        dispatch(getGamesByName(name));
    }

    return(
        <div className='navbar-container'>
            <select onChange={e => handleFilterBySource(e.target.value)} className='select-api-db'>
                <option value='all'>All Games</option>
                <option value='api'>API Games</option>
                <option value='db'>DB Games</option>
            </select>
            <div className='searchbar-container'>
                    <input type='text' placeholder='Search Games' className='searchbar' onChange={(e)=> handleSearchChange(e)}/>
                    <button type='submit' onClick={(e)=> handleSubmit(e)}>Search</button>
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