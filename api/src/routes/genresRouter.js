const express = require('express');
const {Router} = require('express');
const {Videogame, Genre} = require('../../src/db.js');

const genresRouter = Router();


genresRouter.get('/', (req, res) => {
    
})

module.exports = genresRouter;