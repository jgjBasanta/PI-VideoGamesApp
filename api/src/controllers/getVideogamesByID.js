require('dotenv').config();
const axios = require('axios');
const { Videogame, Genres } = require('../../src/db');

const API_KEY = process.env.API_KEY;

const getGamesByIDFromAPI = async (id) => {
    console.log(id);
    try {
        const res = await axios.get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`);
        const game = res.data;
        const data = {
            id: game.id,
            name: game.name,
            description: game.description,
            released: game.released,
            image: game.background_image,
            rating: game.rating,
            platforms: game.platforms.map((platform) => platform.platform.name),
            genres: game.genres.map((genre) => ({id: genre.id, name: genre.name})),
        };
        console.log(data);
        return data;
    } catch (error) {
        console.error("Error while fetching data from the API:", error.message);
        throw error;
    }
}

const getGamesByIDFromDB = async (id) => {
    console.log(id);
    try{
        const res = await Videogame.findOne({
            where: {id: id},
            include: Genres
        });
        const data = res.toJSON();
        
        console.log(data);
        return data;
    }catch(error){
        console.error("Error while fetching data from the DB:", error.message);
        throw error;
    }
}

module.exports = {
    getGamesByIDFromAPI,
    getGamesByIDFromDB
}


// const game = {
        //     id: data.id,
        //     name: data.name,
        //     description: data.description,
        //     released: data.released,
        //     image: data.image,
        //     rating: data.rating,
        //     platforms: data.platforms.map((platform) => platform.platform.name),
        //     genres: data.genres.map((genre) => [{id: genre.id, genre: genre.name}]),
        // }