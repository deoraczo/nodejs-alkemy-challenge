const FilmNotFoundException = require("./FilmNotFoundException");

class FilmFinder {
    constructor (repository) {
        this.repository = repository;
    }

    async findById(id) {
        const film = await this.repository.findById(id);
        if (!film) {
            throw new FilmNotFoundException('Movie not found');
        }

        return film;
    }

    async findByCriteria(criteria) {
        const film = await this.repository.findByCriteria(criteria);
        if (!film) {
            throw new FilmNotFoundException('Movie not found');
        }

        return film;
    }
}

module.exports = FilmFinder;