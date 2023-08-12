import './create.styles.css';
import React from "react";
import { useState } from 'react';

const Create = () => {

    const [state, setState] = useState({
        name: '',
        description: '',
        platforms: '',
        released: '',
        rating: '',
        image: '',
        genres: [],
    })

    const handleChange = e => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    }

    return (

        <div className="form-container">
            <form>
                <label>VideoGame Name:</label>
                <input name='name' onChange={handleChange} type="text"/>
                <label>Description:</label>
                <input name='description' onChange={handleChange} type="text"/>
                <label>Platforms:</label>
                <input name='platforms' onChange={handleChange} type="text"/>
                <label>Release Date:</label>
                <input name='released' onChange={handleChange} type="text"/>
                <label>Rating:</label>
                <input name='rating' onChange={handleChange} type="text"/>
                <label>Image:</label>
                <input name='image' onChange={handleChange} type="text"/>
                <label>Select 1 or more Genres:</label>
                <select name='name' onChange={handleChange}>

                </select>
                <input type="submit" className='create-button'></input>
            </form>
        </div>
    )
}

export default Create;