const FilmFinder = require("../domain/FilmFinder");
const FilmValidator = require("../domain/FilmValidator");

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

    async getFilms() {
        const films = await this.repository.findAllByCriteria({ 
            attributes: ['type', 'title', 'release_date', 'image']
        })
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
                    model: 'Gender'
                }
            ]
        };

        return await this.finder.findByCriteria(filter);
    }
}

module.exports = FilmService;