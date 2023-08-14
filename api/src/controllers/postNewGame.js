const { Videogame, Genre } = require('../db.js');


const createVideoGame = async (name,description,platforms,image,released,rating) => {
     let newVideoGame = await Videogame.create({name,description,platforms,image,released,rating});
     return newVideoGame;

};

const linkGenreToVideogame = async (genre) => {
    let findGenre = await Genre.findAll({
        where: {name: genre}
    });
    return findGenre;
}

module.exports = {
    linkGenreToVideogame,
    createVideoGame
}