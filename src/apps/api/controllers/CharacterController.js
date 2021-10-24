const { Op } = require('sequelize');
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
        const query = req.query;

        const filter = {
            where: {},
            attributes: ['image', 'name'],
            include: []
        };

        Object.keys(query).forEach(q => {
            if ('like' in query[q]) {
                filter.where[q] = {
                    [Op.like]: `%${query[q].like}%`
                }
            }

            if ('eq' in query[q]) {
                filter.where[q] = {
                    [Op.eq]: query[q].eq
                }
            }

            if ('gte' in query[q]) {
                filter.where[q] = {
                    [Op.gte]: query[q].gte
                }
            }

            if ('lte' in query[q]) {
                filter.where[q] = {
                    [Op.lte]: query[q].lte
                }
            }
        })

        console.log(filter);

        const characters = await this.characterService.getAllCharacters(filter);

        return res.status(200).json({
            data: {
                characters: characters
            }
        });
    }

    getCharacter = async (req, res, next) => {
        const { id } = req.params;

        const character = await this.characterService.findCharacter(id);

        return res.json({
            data: {
                character
            }
        });
    }
}

module.exports = CharacterController;