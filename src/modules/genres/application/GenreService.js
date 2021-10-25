const GenreFinder = require("../domain/GenreFinder");
const GenreValidator = require("../domain/GenreValidator");

class GenreService {
    constructor(repository) {
        this.repository = repository;
        this.finder = new GenreFinder(repository);
        this.validator = new GenreValidator(repository);
    }

    async createGenre(req) {
        await this.validator.validateCreateGenre(req);

        const createdGenre = await this.repository.save({ ...req });

        return createdGenre;
    }

    async updateGenre(id, req) {
        await this.finder.findById(id);
        
        await this.validator.validateUpdateGenre(id, req);

        await this.repository.update(id, req);
    }

    async findAllGenres() {
        const genres = await this.repository.findAll();

        return genres;
    }
}

module.exports = GenreService;