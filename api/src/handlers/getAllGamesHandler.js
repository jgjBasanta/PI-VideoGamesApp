const express = require('express');
const { Router } = require('express');
const { getAllGames } = require('../controllers/getAllVideogames');

// Define a handler function for the route
const getAllGamesHandler = async (req, res, next) => {
  try {
    const allGames = await getAllGames();
    res.status(200).send(allGames);
  } catch (error) {
    next(error);
  }
};

// Use the handler function for the route


module.exports = getAllGamesHandler;
