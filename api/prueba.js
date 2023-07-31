// prueba.js
require('dotenv').config();
const { getAllGames, getGamesFromDB, getGamesFromAPI } = require('./src/controllers/getAllVideogames');

console.log('API_KEY:', process.env.API_KEY); // Check if API_KEY is defined

// Rest of your code...


const API_KEY = process.env.API_KEY; // Set your API key here

async function testGetAllGames() {
  try {
    const allGames = await getAllGames();
    console.log('All Games:', allGames);
  } catch (error) {
    console.error('Error while fetching all games:', error.message);
  }
}

testGetAllGames();
