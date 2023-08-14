import './create.styles.css';
import React from "react";
import { Link, useHistory } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getGenres, postGame } from '../../redux/actions';


const Create = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const allGenres = useSelector(state => state.genres);
    

    const [input, setInput] = useState({
        name: '',
        description: '',
        platforms: '',
        released: '',
        rating: '',
        image: '',
        genres: [],
    })

    useEffect(() => {
        dispatch(getGenres());
    }, []);

    // const [error, setError] = useState({
    //     name: 'Please write the name of the game',
    //     description: 'Please write the description of the game',
    //     platforms: 'Please write at least one platform for the game',
    //     released: 'Please write the date in the following format: MM-DD-YYYY',
    //     rating: 'Please use Numbers to rate the game',
    //     image: 'Please use a valid URL (e.g. https://)',
    // })

    const handleChange = e => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
        console.log(input);
        // validation({...state, [e.target.name]: e.target.value}, e.target.name)
    }

    const handleSelect = e => {
        setInput({
            ...input,
            genres: [...input.genres, e.target.value]
        })
    }

    const handleSubmit = e => {
        e.preventDefault();
        console.log(input);
        dispatch(postGame(input));
        alert("Game added!");
        setInput({
            name: '',
            description: '',
            platforms: '',
            released: '',
            rating: '',
            image: '',
            genres: [],
        });
        history.push('/home');
    }

    // const disableSubmit = () => {
    //     let disabled = true;
    //     for (let err in error) {
    //         if (error[err] === '') {
    //             disabled = false;
    //         } else {
    //             disabled = true;
    //             break;}
    //     }
    //     return disabled;
    // }

    //  

    return (

        <div className="form-container">
            <Link to="/home">Go Back to Home</Link>
            <h1>Add Your Game</h1>
            <form onSubmit={(e)=> handleSubmit(e)}>
                <div>
                    <label>VideoGame Name:</label>
                    <input value={input.name} name='name' onChange={handleChange} type="text"/>
                    {/* <label className='form-error'>{error.name}</label> */}
                </div>
                <div>
                    <label>Description:</label>
                    <input value={input.description} name='description' onChange={handleChange} type="text"/>
                    {/* <label className='form-error'>{error.description}</label> */}
                </div>
                <div>
                    <label>Platforms:</label>
                    <input value={input.platforms} name='platforms' onChange={handleChange} type="text"/>    
                </div>
                <div>
                    <label>Release Date:</label>
                    <input value={input.released} name='released' onChange={handleChange} type="text"/>
                    {/* <label className='form-error'>{error.released}</label> */}
                </div>
                <div>    
                    <label>Rating:</label>
                    <input value={input.rating} name='rating' onChange={handleChange} type="text"/>
                </div>
                <div>    
                    <label>Image:</label>
                    <input value={input.image} name='image' onChange={handleChange} type="text"/>
                </div>
                <div>    
                    <label>Select 1 or more Genres:</label>
                    <select onChange={(e) => handleSelect(e)} className='create-form-select-genres'>
                    {allGenres.map(genre => (
                        <option key={genre.id} value={genre.name}>{genre.name}</option>
                    ))}
                    </select>
                </div>
                <div>
                    <ul>
                        <li>{input.genres.map(genre => genre + ' - ')}</li>
                    </ul>
                </div>

                <button type="submit" className='create-button'>Submit</button>
            </form>
        </div>
    )
}

export default Create;