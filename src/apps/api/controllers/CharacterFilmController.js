class CharacterFilmController {
    constructor(chracterFilmService) {
        this.chracterFilmService = chracterFilmService;
    }

    addCharacter = async (req, res, next) => {
        const { movieId, characterId } = req.params;
        await this.chracterFilmService.addCharacter(movieId, characterId);
    }
}

module.exports = CharacterFilmController;