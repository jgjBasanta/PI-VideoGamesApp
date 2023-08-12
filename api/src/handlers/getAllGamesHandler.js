const express = require('express');
const { Router } = require('express');
const stringSimilarity = require('string-similarity');
const { getAllGames } = require('../controllers/getAllVideogames');

const getAllGamesHandler = async (req, res, next) => {
  const gameSearch = req.query.search;
  

  try {
    const allGames = await getAllGames();
    if (gameSearch) {
      const splitSearch = gameSearch.split(" ");
      let closestGames = []; // Declare closestGames outside the condition
      if (splitSearch.length > 1) {
        for (let i = 0; i < splitSearch.length; i++) {
          const currentSearch = splitSearch[i];
          const filteredGames = allGames.filter((game) => game.name.toLowerCase().includes(currentSearch.toLowerCase()));
          closestGames.push(...filteredGames.slice(0, 15));
        }
      } else {
        closestGames = allGames.filter((game) => game.name.toLowerCase().includes(gameSearch.toLowerCase()));
      }
      if (closestGames.length === 0) {
        res.status(404).send("No games found");
      } else {
        res.status(200).send(closestGames);
      }
    } else {
      res.status(200).send(allGames);
    }
  } catch (error) {
    next(error);
  }
};

module.exports = getAllGamesHandler;
