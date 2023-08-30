require('dotenv').config();
const axios = require('axios');
const { Genres } = require('../../src/db');

const API_KEY = process.env.API_KEY;

const getAllGenres = async () => {
    try {
        const res = await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`, {timeout: 30000});
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
      if (error.response && error.response.data && error.response.data.error) {
          console.error("Error while fetching data from the API:", error.response.data.error);
          throw new Error(`Failed to fetch genres. API error: ${error.response.data.error}`);
      } else {
          console.error("Error while fetching data from the API:", error.message);
          throw new Error("Failed to fetch genres. An unknown error occurred.");
      }
    }
}

module.exports = getAllGenres;