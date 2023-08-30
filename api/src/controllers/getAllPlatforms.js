require('dotenv').config();
const axios = require('axios');

const API_KEY = process.env.API_KEY;

const getAllPlatforms = async (req, res) => {
    try {
      const apiData = await axios.get(`https://api.rawg.io/api/platforms?key=${API_KEY}`, {timeout: 30000});
      const platforms = apiData.data.results.map((platform) => ({name: platform.name,
        id: platform.id}));
      res.status(200).send(platforms);
    } catch (error) {
      console.error("Error while fetching data from the API:", error.message);
      throw error;
    }
  };

module.exports = {
    getAllPlatforms
}