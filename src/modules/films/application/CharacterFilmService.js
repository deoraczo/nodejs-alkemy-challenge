const AssociationException = require("../../../shared/exceptions/ AssociationException");
const CharacterFinder = require("../../characters/application/CharacterFinder");
const FilmFinder = require("../domain/FilmFinder");

class CharacterFilmService {
    constructor(repository, filmRepository, characterRepository) {
        this.repository = repository;
        this.filmFinder = new FilmFinder(filmRepository);
        this.characterFinder = new CharacterFinder(characterRepository);
    }

    async addCharacter(filmId, characterId) {
        const film = await this.filmFinder.findById(filmId);
        const character = await this.characterFinder.findById(characterId);

        const associationExists = await this.repository.findByCriteria({ where: {  filmId, characterId } });

        if (associationExists) {
            throw new AssociationException('The association of characters and films already exists');
        }

        await this.repository.save({ filmId, characterId });
    }
}

module.exports = CharacterFilmService;