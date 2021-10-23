class CharacterController {
    constructor(characterService) {
        this.characterService = characterService;
    }

    createCharacter = async (req, res, next) => {
        const { name, age, weigth, history, image } = req.body;
        const createCharacterResponse = await this.characterService.createCharacter({ name, age, weigth, history, image });

        return res.status(201).json({
            message: 'Character created successfully',
            data: {
                character: createCharacterResponse
            }
        });
    }

    updateCharacter = async (req, res, next) => {
        const { id } = req.params;
        const { name, age, weigth, history, image } = req.body;

        await this.characterService.updateCharacter({ id, name, age, weigth, history, image });

        return res.status(201).json({
            message: 'Character updated successfully'
        });
    }

    deleteCharacter = async (req, res, next) => {
        const { id } = req.params;

        await this.characterService.deleteCharacter(id);

        return res.status(200).json({
            message: 'Characted deleted successfully'
        });
    }

    getCharacters = async (req, res, next) => {
        const characters = await this.characterService.getAllCharacters();

        return res.status(200).json({
            data: {
                characters: characters
            }
        });
    }
}

module.exports = CharacterController;