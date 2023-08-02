require('dotenv').config();
const axios = require('axios');
const { Genres } = require('../../src/db');

const API_KEY = process.env.API_KEY;

const getAllGenres = async () => {
    try {
        const res = await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`);
        const genres = res.data.results.map((genre) => ({
            id: genre.id,
            name: genre.name})
        );

        genres.forEach(genre => {
            if (genre) {
                genres.forEach(async g => {
                await Genres.findOrCreate({
                  where: { name: g.name.trim() }
                });
              });
            }
          });
        const allGenres = await Genres.findAll();
        return allGenres;
    } catch (error) {
        console.error("Error while fetching data from the API:", error.message);
        throw error;
    }
}

module.exports = getAllGenres;