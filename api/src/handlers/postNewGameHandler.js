const {Videogame, Genres} = require('../db.js');
const {createVideoGame, linkGenreToGame} = require('../controllers/postNewGame');
const postGamesHandler = async (req,res)=>{
    let {name,description,platforms,image,released,rating, genres} = req.body;
    let gameCreated = await createVideoGame(name,description,platforms,image,released,rating);
    let genresDB = await linkGenreToGame(genres);
    try {
        if (!name && !description && !platforms && !image && !released && !rating && !genres){
            return res.status(400).send("Faltan datos. Juego no creado.");
        } else {
            gameCreated.addGenres(genresDB);
            res.status(200).send("Juego Creado Satisfactoriamente!");
        }
    } catch (error) {
        console.log("Error: ", error.message);
        res.status(400).send(error.message);
    }
};

module.exports = postGamesHandler;