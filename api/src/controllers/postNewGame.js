const { Videogame, Genres } = require('../db.js');


const createVideoGame = async (req, res) => {
    let {name,description,platforms,image,released,rating, genres} = req.body;
    if(!image){
        image = 'https://media.rawg.io/media/screenshots/238/238b1d15ead30bfa1c76e3dad6365554.jpg'
    }

    if(name && description && platforms && image && released && rating && genres){
        let newVideoGame = await Videogame.create({name,description,platforms,image,released,rating});

        for(const genreName of genres){
            let genreDB = await Genres.findAll({
                where: {
                    name: genreName,
                }
            })

            if(genreDB){
                await newVideoGame.addGenres(genreDB);
            } else {
                console.log(`Genre '${genreName}' not found in the database.`)
            }

        }
        const videoGameWithGenres = await Videogame.findOne({
            where: { id: newVideoGame.id },
            include: Genres
        });
        res.status(200).json(videoGameWithGenres.toJSON());
    } else {
        res.status(400).send("Faltan datos. Juego no creado.");
    }
};

module.exports = {
    createVideoGame
}

