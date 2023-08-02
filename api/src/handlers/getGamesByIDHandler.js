const express = require('express');
const { Router } = require('express');
const { getGamesByIDFromDB, getGamesByIDFromAPI } = require('../controllers/getVideogamesByID');

const getGamesByIDHandler = async (req, res, next) => {
    
    const gameID = req.params.id;
    try{
        if(gameID.includes("-")) {
            res.status(200).send(await getGamesByIDFromDB(gameID));        
        } else {
            const gameIDNumber = parseInt(gameID);
            res.status(200).send(await getGamesByIDFromAPI(gameIDNumber));
        }
    } catch (error) {
        res.status(400).send({error:error.message});
    }
}

module.exports = getGamesByIDHandler;