require('dotenv').config();
const axios = require('axios');
const { Videogame, Genres } = require('../../src/db');

const API_KEY = process.env.API_KEY;

const getGamesByIDFromAPI = async (id) => {
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
            genres: game.genres.map((genre) => genre.name),
        };
        return data;
    } catch (error) {
        console.error("Error while fetching data from the API:", error.message);
        throw error;
    }
}

const getGamesByIDFromDB = async (id) => {
    return await Videogame.findByPk(id);
}

module.exports = {
    getGamesByIDFromAPI,
    getGamesByIDFromDB
}