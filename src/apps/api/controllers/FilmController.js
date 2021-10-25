const { Op, json } = require('sequelize');
const uploader = require('../../../modules/uploader/FileUploader');
class FilmController {
    constructor(service) {
        this.service = service;
    }

    createFilm = async (req, res, next) => {
        const { type, title, releaseDate, image, rating, genreId } = req.body;
        const createFilmResponse = await this.service.createFilm({ type: type?.toLowerCase() , title, releaseDate, image, rating, genreId });

        return res.status(201).json({
            message: 'Movie created successfully',
            data: {
                movie: createFilmResponse
            }
        });
    }

    updateFilm = async (req, res, next) => {
        const { id } = req.params;
        const { type, title, releaseDate, image, rating, genreId } = req.body; 

        await this.service.updateFilm(id, { type: type?.toLowerCase() , title, releaseDate, image, rating, genreId });

        return res.json({
            message: 'Movie updated successfully'
        });
    }

    getFilms = async (req, res, next) => {

        const query = req.query;


        const filter = {
            where: {},
            attributes: ['type', 'title', 'release_date', 'image'],
            include: [],
            order: []
        };

        Object.keys(query).forEach(q => {
            if (typeof query[q] === 'object' && 'like' in query[q]) {
                filter.where[q] = {
                    [Op.like]: `%${query[q].like}%`
                }
            }

            if (typeof query[q] === 'object' && 'eq' in query[q]) {
                if (q == 'genre') {
                    filter.where['genreId'] = {
                        [Op.eq]: query[q].eq
                    }
                }
            }

            if ('orderBy' in query) {
                filter.order = [query.orderBy.split(',')]
            }
        })

        const films = await this.service.getFilms(filter);

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

    upload = async (req, res, next) => {

        const { id } = req.params;        

        await this.service.uploadImage(id, req.file);

        return res.json({
            message: 'Image uploaded successfully'
        });
    }
}

module.exports = FilmController;
