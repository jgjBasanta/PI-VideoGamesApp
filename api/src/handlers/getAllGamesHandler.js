const express = require('express');
const { Router } = require('express');
const stringSimilarity = require('string-similarity');
const { getAllGames } = require('../controllers/getAllVideogames');

// Define a handler function for the route
// const getAllGamesHandler = async (req, res, next) => {
//   const gameSearch = req.query.search;
//   try {
//     const allGames = await getAllGames();
//     if(gameSearch) {
//       const filteredGames = allGames.filter((game) => game.search.toLowerCase().includes(gameSearch.toLowerCase()));
//       res.status(200).send(filteredGames);
//     } else {
//       res.status(200).send(allGames);
//     }
//   } catch (error) {
//     next(error);
//   }
// };



const getAllGamesHandler = async (req, res, next) => {
  const gameSearch = req.query.name;
  try {
    const allGames = await getAllGames();
    if (gameSearch) {
      const filteredGames = allGames.filter((game) => game.name.toLowerCase().includes(gameSearch.toLowerCase()));
      const sortedGames = filteredGames.sort((a, b) => {
        const similarityA = stringSimilarity.compareTwoStrings(gameSearch.toLowerCase(), a.name.toLowerCase());
        const similarityB = stringSimilarity.compareTwoStrings(gameSearch.toLowerCase(), b.name.toLowerCase());
        return similarityB - similarityA;
      });
      const closestGames = sortedGames.slice(0, 15);
      res.status(200).send(closestGames);
    } else {
      res.status(200).send(allGames);
    }
  } catch (error) {
    next(error);
  }
};



module.exports = getAllGamesHandler;
