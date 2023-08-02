const express = require('express');
const {Router} = require('express');
const getAllGenresHandler = require('../handlers/getAllGenresHandler');

const genresRouter = Router();


genresRouter.get('/', getAllGenresHandler)

module.exports = genresRouter;