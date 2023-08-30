const { Router } = require('express');
const games = require('./videogamesRouter');
const genres = require('./genresRouter');
const { getAllPlatforms } = require('../controllers/getAllPlatforms');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');



const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use("/games", games);
router.use("/genres", genres);
router.get('/platforms', getAllPlatforms);


module.exports = router;
