const express = require('express');
const {Router} = require('express');
const getAllGamesHandler = require('../handlers/getAllGamesHandler');
const videogamesRouter = Router();


videogamesRouter.get('/', getAllGamesHandler);

module.exports = videogamesRouter;