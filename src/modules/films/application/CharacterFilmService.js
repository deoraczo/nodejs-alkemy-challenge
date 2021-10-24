class CharacterFilmService {
    constructor(repository) {
        this.repository = repository;
    }

    async addCharacter(filmId, characterId) {
        await this.repository.save({ filmId, characterId });
    }
}

module.exports = CharacterFilmService;