const FilmFinder = require("../domain/FilmFinder");
const FilmValidator = require("../domain/FilmValidator");
const uploader  = require('../../uploader/FileUploader');
class FilmService {
    constructor(repository, genderRepository) {
        this.repository = repository;
        this.validator = new FilmValidator(repository, genderRepository);
        this.finder = new FilmFinder(repository);
    }

    async createFilm(request) {
        await this.validator.validateCreateFilm(request);
        const createdFilm = await this.repository.save({ ...request });

        return createdFilm;
    }

    async updateFilm(id, request) {
        const film = await this.finder.findById(id);
        await this.validator.validateUpdateFilm(id, request);

        await this.repository.update(id, request);
    }

    async getFilms(filter) {
        const films = await this.repository.findAllByCriteria(filter)
        return films;
    }

    async deleteFilm(id) {
        await this.finder.findById(id);
        
        await this.repository.remove(id);
    }

    async findFilm(id) {
        const filter = {
            where: {
                id
            },
            include: [
                {
                    model: 'Character',
                    as: 'characters',
                    through: {
                        attributes: []
                    }
                },
                {
                    model: 'Genre',
                    as: 'genre'
                }
            ]
        };

        return await this.finder.findByCriteria(filter);
    }

    async uploadImage(id, file) {
        await this.finder.findById(id);

        const imageURL = await uploader.upload(file);

        await this.repository.update(id,  { image: imageURL });
        
    }
}

module.exports = FilmService;