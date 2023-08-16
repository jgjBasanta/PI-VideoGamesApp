const { Videogame, Genres } = require('../db.js');


const createVideoGame = async (name,description,platforms,image,released,rating) => {
     let newVideoGame = await Videogame.create({name,description,platforms,image,released,rating});
     return newVideoGame;

};

const linkGenreToGame = async (genre) => {
    let findGenre = await Genres.findAll({
        where: {name: genre}
    });
    return findGenre;
}

module.exports = {
    linkGenreToGame,
    createVideoGame
}