require('dotenv').config();
const axios = require('axios');
const { Videogame, Genres } = require('../../src/db');

const API_KEY = process.env.API_KEY;

const getGamesFromAPI = async () => {
    try {
      let dataFromAPI = [];
  
      for (let i = 1; i <= 5; i++) {
        const res = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=${i}`);
        dataFromAPI.push(
          ...res.data.results.map((videogame) => ({
            id: videogame.id,
            name: videogame.name,
            platforms: videogame.platforms.map((platform) => platform.platform.name),
            image: videogame.background_image,
            released: videogame.released,
            rating: videogame.rating,
            genres: videogame.genres.map((genre) => ({
             name: genre.name, id: genre.id})),
          }))
        );
      }
      return dataFromAPI;
    } catch (error) {
      console.error("Error while fetching data from the API:", error.message);
      throw error;
    }
  };


const getGamesFromDB = async () =>{ 
    return await Videogame.findAll({
        include: [{
            model: Genres,
            attributes: ['name'],
            through: {
                attributes: []
            }
        }]
    });
}

const getAllGames = async () => {
    const gamesFromAPI = await getGamesFromAPI();
    const gamesFromDB = await getGamesFromDB();
    const allGames = gamesFromAPI.concat(gamesFromDB);
    return allGames;
}

module.exports = {
    getAllGames,
    getGamesFromDB,
    getGamesFromAPI
}