class FilmController {
    constructor(service) {
        this.service = service;
    }

    createFilm = async (req, res, next) => {
        const { type, title, releaseDate, image, rating, genderId } = req.body;
        const createFilmResponse = await this.service.createFilm({ type: type?.toLowerCase() , title, releaseDate, image, rating, genderId });

        return res.status(201).json({
            message: 'Movie created successfully',
            data: {
                movie: createFilmResponse
            }
        });
    }

    updateFilm = async (req, res, next) => {
        const { id } = req.params;
        const { type, title, releaseDate, image, rating, genderId } = req.body; 

        await this.service.updateFilm(id, { type: type?.toLowerCase() , title, releaseDate, image, rating, genderId });

        return res.json({
            message: 'Movie updated successfully'
        });
    }

    getFilms = async (req, res, next) => {
        const films = await this.service.getFilms();

        return res.json({
            data: {
                movies: films
            }
        });
    }

    deleteFilm = async (req, res, next) => {
        const { id } = req.params;

        await this.service.deleteFilm(id);
        
        return res.json({
            message: 'Movie deleted successfully'
        });
    }

    getFilm = async (req, res, next) => {
        const { id } = req.params;

        const movie = await this.service.findFilm(id);

        return res.json({
            data: {
                movie
            }
        });
    }
}

module.exports = FilmController;
