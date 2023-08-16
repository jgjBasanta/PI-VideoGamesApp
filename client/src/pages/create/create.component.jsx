import './create.styles.css';
import React from "react";
import { Link, useHistory } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getGenres, postGame } from '../../redux/actions';

function validate(input) {
    let errors = {};
    if (!input.name) {
        errors.name = 'Please write the name of the game';
    } else if (!input.description) {
        errors.description = 'Please write the description of the game';
    } else if (!input.platforms) {
        errors.platforms = 'Please write at least one platform for the game';
    } else if (!input.released) {
        errors.released = 'Please write the date in the following format: MM-DD-YYYY';
    } else if (!input.rating) {
        errors.rating = 'Please use Numbers to rate the game';
    } else if (!input.image) {
        errors.image = 'Please use a valid URL (e.g. https://)';
    } else if (!input.genres) {
        errors.genres = 'Please select at least one genre';
    }
    return errors;
}

const Create = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const allGenres = useSelector(state => state.genres);
    const [ errors, setErrors ] = useState({});
    

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


    const handleChange = e => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
        }))
        console.log(input);
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

    
    useEffect(() => {
      disableSubmit();
    }, [input, errors]);
    
    const disableSubmit = () => {
      const hasErrors = Object.keys(errors).length > 0;
      const isFormEmpty = Object.values(input).some(value => value === '');
      return hasErrors || isFormEmpty;
    };
    

    return (

        <div className="form-container">
            <Link to="/home">Go Back to Home</Link>
            <h1>Add Your Game</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>VideoGame Name:</label>
                    <input value={input.name} name='name' onChange={handleChange} type="text"/>
                    {errors.name && (
                        <p className='form-error'>{errors.name}</p>
                    )}
                </div>
                <div>
                    <label>Description:</label>
                    <input value={input.description} name='description' onChange={handleChange} type="text"/>
                    {errors.description && (
                        <p className='form-error'>{errors.description}</p>
                    )}
                </div>
                <div>
                    <label>Platforms:</label>
                    <input value={input.platforms} name='platforms' onChange={handleChange} type="text"/>   
                    {errors.platforms && (
                        <p className='form-error'>{errors.platforms}</p>
                    )} 
                </div>
                <div>
                    <label>Release Date:</label>
                    <input value={input.released} name='released' onChange={handleChange} type="text"/>
                    {errors.released && (
                        <p className='form-error'>{errors.released}</p>
                    )}
                </div>
                <div>    
                    <label>Rating:</label>
                    <input value={input.rating} name='rating' onChange={handleChange} type="text"/>
                    {errors.rating && (
                        <p className='form-error'>{errors.rating}</p>
                    )}
                </div>
                <div>    
                    <label>Image:</label>
                    <input value={input.image} name='image' onChange={handleChange} type="text"/>
                    {errors.image && (
                        <p className='form-error'>{errors.image}</p>
                    )}
                </div>
                <div>    
                    <label>Select 1 or more Genres:</label>
                    <select onChange={(e) => handleSelect(e)} className='create-form-select-genres'>
                    {allGenres.map(genre => (
                        <option key={genre.id} value={genre.name}>{genre.name}</option>
                    ))}
                    </select>
                    {errors.genres && (
                        <p className='form-error'>{errors.genres}</p>
                    )}
                </div>
                <div>
                    <ul>
                        <li>{input.genres.map(genre => genre + ' - ')}</li>
                    </ul>
                </div>

                <button type="submit" className='create-button' disabled={disableSubmit()}>Submit</button>
            </form>
        </div>
    )
     

}

export default Create;