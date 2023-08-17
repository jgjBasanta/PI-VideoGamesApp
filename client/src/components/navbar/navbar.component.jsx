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
    const [ blankSearch, setBlankSearch ] = useState("");

    function handleSearchChange(e){
        e.preventDefault();
        setName(e.target.value);
        console.log(name)
    }

    function handleSubmit(e){
        e.preventDefault();
        dispatch(getGamesByName(name));
    }

    const onClick = () => {
        
    }

    return(
        <div className='navbar-container'>
            <div className='page-name-container'>
                <h1 className='page-name'>IVGDB</h1>
            </div>
            <div className='select-container'>
                <div>
                    <select onChange={e => handleFilterBySource(e.target.value)} className='select-api-db'>
                        <option value='all'>All Games</option>
                        <option value='api'>API Games</option>
                        <option value='db'>DB Games</option>
                    </select>
                </div>
                <div>
                    <select onChange={e => handleFilteredGenres(e.target.value)} className='select-genres'>
                        <option className='option' value={'All Genres'}>All Genres</option>
                        {allGenres.map(genre => (
                            <option key={genre.id} value={genre.name}>{genre.name}</option>
                        ))}
                    </select>
                </div>
            </div>
            <div className='searchbar-container'>
                <div>
                    <input type='text' placeholder='Search Games by Name or ID' className='searchbar' onChange={(e)=> handleSearchChange(e)}/>
                </div>
                <div>
                    <button className='search-button' type='submit' onClick={(e)=> handleSubmit(e)}></button>
                </div>
            </div>
            <div className='sort-container'>
                <div>
                    <button className='sort-atoz-button' onClick={handleNameSort}>A/Z</button>
                </div>
                <div>

                    <button className='sort-rating-button' onClick={handleRatingSort}>*</button>
                </div>
            </div>
            <div className="go-create-container">
                <Link className="create-link" to="/create">
                    <button className='go-create-button'>Add Game</button>
                </Link>
            </div>

        </div>
    )
};
export default NavBar; 