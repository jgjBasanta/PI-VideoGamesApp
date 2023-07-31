const { Router } = require('express');
const videogames = require('./videogamesRouter');
const genres = require('./genresRouter');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');



const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use("/videogames", videogames);
router.use("/genres", genres);


module.exports = router;
