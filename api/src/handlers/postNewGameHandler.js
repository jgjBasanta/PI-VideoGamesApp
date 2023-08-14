const {Videogame} = require('../db.js');
const {createVideoGame, linkGenreToVideogame} = require('../controllers/postNewGame');
const postGamesHandler = async (req,res)=>{
    let {name,description,platforms,image,released,rating,genre}= req.body;
    let newVideoGame = await createVideoGame(name,description,platforms,image,released,rating);

    try {
        if(!name||!description||!platforms||!image||!released||!rating) throw Error("Missing data");
        newVideoGame;
        newVideoGame.addGenre(linkGenreToVideogame(genre));
        res.status(200).send(newVideoGame);
        console.log(newVideoGame);
    } catch (error) {
        console.log(error)
        res.status(400).send({error:error.message});
    }
};

module.exports = postGamesHandler;