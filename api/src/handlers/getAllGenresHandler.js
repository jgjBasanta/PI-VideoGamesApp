const getAllGenres = require('../controllers/getGenres');

const getAllGenresHandler = async (req, res, next) => {
    try {
        const allGenres = await getAllGenres();
        res.status(200).send(allGenres);
    } catch (error) {
        next(error);
    }
}

module.exports = getAllGenresHandler;