const express = require('express');
const { Router } = require('express');
const { getGamesByIDFromDB, getGamesByIDFromAPI } = require('../controllers/getVideogamesByID');

const getGamesByIDHandler = async (req, res, next) => {
    
    const gameID = req.params.id;
    console.log(gameID);
    try{
        if(isNaN(gameID)) {
            // let gameData = async getGamesByIDFromDB(gameID);
            // let gameDetails = {
            //     id: gameData.id,
            //     name: gameData.name,
            //     description: gameData.description,
            //     released: gameData.released,
            //     image: gameData.image,
            //     rating: gameData.rating,
            //     platforms: gameData.platforms.map((platform) => platform.platform.name),
            //     genres: gameData.genres.map((genre) => [{id: genre.id, genre: genre.name}])
            // }
            res.status(200).send(await getGamesByIDFromDB(gameID));        
        } else {
            // const gameIDNumber = parseInt(gameID);
            res.status(200).send(await getGamesByIDFromAPI(gameID));
        }
    } catch (error) {
        res.status(400).send({error:error.message});
    }
}

module.exports = getGamesByIDHandler;

// typeof gameID === 'string'