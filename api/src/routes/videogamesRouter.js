const express = require('express');
const {Router} = require('express');
const getAllGamesHandler = require('../handlers/getAllGamesHandler');
const getGamesByIDHandler = require('../handlers/getGamesByIDHandler');
const postNewGamesHandler = require('../handlers/postNewGameHandler');
const gamesRouter = Router();


gamesRouter.get('/', getAllGamesHandler);
gamesRouter.get('/?:id', getGamesByIDHandler);
gamesRouter.post('/', postNewGamesHandler);

module.exports = gamesRouter;