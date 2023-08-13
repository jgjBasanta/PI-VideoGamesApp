import './create.styles.css';
import React from "react";
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getGenres } from '../../redux/actions';

const Create = () => {
    const dispatch = useDispatch();
    const allGenres = useSelector(state => state.genres);

    const [state, setState] = useState({
        name: '',
        description: '',
        platforms: '',
        released: '',
        rating: '',
        image: '',
        genres: [],
    })

    const [error, setError] = useState({
        name: 'Please write the name of the game',
        description: 'Please write the description of the game',
        platforms: 'Please write at least one platform for the game',
        released: 'Please write the date in the following format: MM-DD-YYYY',
        rating: 'Please use Numbers to rate the game',
        image: 'Please use a valid URL (e.g. https://)',
    })

    const handleChange = e => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
        validation({...state, [e.target.name]: e.target.value}, e.target.name)
    }

    const handleSubmit = e => {
        e.preventDefault();
        console.log(state)
    }

    const disableSubmit = () => {
        let disabled = true;
        for (let err in error) {
            if (error[err] === '') {
                disabled = false;
            } else {
                disabled = true;
                break;}
        }
        return disabled;
    }

    const validation = (state, name) => {
        if (name === 'name') {
            if (state.name === '') {
                setError({
                    ...error,
                    name: 'Please write the name of the game'
                })
            }
        } else{
            setError({
                ...error,
                name: '',
            })
        }

        if (name === 'released') {
            if (state.released === '') {
                setError({
                    ...error,
                    released: 'Please write the date in the following format: MM-DD-YYYY'
                })
            } else {
                const regex = /^\d{2}-\d{2}-[1960-2023]$/;
                if (!regex.test(state.released)) {
                    setError({
                        ...error,
                        released: 'Wrong Format. Please write the date in the following format: MM-DD-YYYY'
                    })
                } else {
                    setError({
                        ...error,
                        released: '',
                    })
                }
            }
        } else {
            setError({
                ...error,
                released: '',
            })
        }
    }

    return (

        <div className="form-container">
            <form onSubmit={handleSubmit}>
                <label>VideoGame Name:</label>
                <input name='name' onChange={handleChange} type="text"/>
                <label className='form-error'>{error.name}</label>
                <label>Description:</label>
                <input name='description' onChange={handleChange} type="text"/>
                <label className='form-error'>{error.description}</label>
                <label>Platforms:</label>
                <input name='platforms' onChange={handleChange} type="text"/>
                <label>Release Date:</label>
                <input name='released' onChange={handleChange} type="text"/>
                <label className='form-error'>{error.released}</label>
                <label>Rating:</label>
                <input name='rating' onChange={handleChange} type="text"/>
                <label>Image:</label>
                <input name='image' onChange={handleChange} type="text"/>
                <label>Select 1 or more Genres:</label>
                <select className='create-form-select-genres'>
                {allGenres.map(genre => (
                    <option key={genre.id} value={genre.name}>{genre.name}</option>
                ))}
            </select>
                <input disabled={disableSubmit()} type="submit" className='create-button'></input>
            </form>
        </div>
    )
}

export default Create;