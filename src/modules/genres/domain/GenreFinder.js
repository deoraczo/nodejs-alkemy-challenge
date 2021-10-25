const GenreNotFoundException = require("./GenreNotFoundException");

class GenreFinder {
    constructor(repository) {
        this.repository = repository;
    }

    async findById(id) {
        const Genre = await this.repository.findById(id);
        
        if (!Genre) {
            throw new GenreNotFoundException('Genre not found');
        }

        return Genre;
    }
}


module.exports = GenreFinder;