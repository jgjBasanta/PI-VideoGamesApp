const { Videogame, Genre } = require('../db.js');


const createVideoGame = async (name,description,platforms,image,released,rating,genre) => {
    return await Videogame.create({name,description,platforms,image,released,rating,genre});

};

module.exports = {
    createVideoGame
}