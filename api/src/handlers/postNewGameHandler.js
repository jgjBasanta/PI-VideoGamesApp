const {Videogame} = require('../db.js');
const {createVideoGame} = require('../controllers/postNewGame');
const postGamesHandler = async (req,res)=>{
    const {name,description,platforms,image,released,rating,genre}= req.body;
    try {
        if(!name||!description||!platforms||!image||!released||!rating||!genre) throw Error("Missing data");
    const newVideoGame = await createVideoGame(name,description,platforms,image,released,rating,genre);
    
    res.status(201).send(newVideoGame);
        console.log(newVideoGame.dataValues);
    } catch (error) {
        res.status(400).send({error:error.message});
    }
};

module.exports = postGamesHandler;