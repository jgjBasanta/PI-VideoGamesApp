const express = require('express');
const {Router} = require('express');
const getAllGamesHandler = require('../handlers/getAllGamesHandler');
const getGamesByIDHandler = require('../handlers/getGamesByIDHandler');
const {createVideoGame} = require('../controllers/postNewGame');
const gamesRouter = Router();


gamesRouter.get('/', getAllGamesHandler);
gamesRouter.get('/:id', getGamesByIDHandler);
gamesRouter.post('/', createVideoGame);

module.exports = gamesRouter;