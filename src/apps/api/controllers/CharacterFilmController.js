class CharacterFilmController {
    constructor(chracterFilmService) {
        this.chracterFilmService = chracterFilmService;
    }

    addCharacter = async (req, res, next) => {
        const { movieId, characterId } = req.params;
        await this.chracterFilmService.addCharacter(movieId, characterId);

        return res.status(201).json({
            message: 'Character added successfully'
        });
    }
}

module.exports = CharacterFilmController;