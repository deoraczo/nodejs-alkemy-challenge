const CharacterFinder = require("./CharacterFinder");
const Yup = require('yup');
const ValidationException = require("../../../shared/exceptions/ValidationException");
const { Op } = require("sequelize");
const CharacterValidator = require("../domain/CharacterValidator");
const uploader = require('../../uploader/FileUploader');
class CharacterService {
    constructor(characterRepository){
        this.characterRepository = characterRepository;
        this.finder = new CharacterFinder(characterRepository);
        this.characterValidator = new CharacterValidator(characterRepository);
    }

    async createCharacter({ name, age, weigth, history, image }) {

        await this.characterValidator.validateCreateCharacter({ name, age, image, history, weigth });

        const createdCharacter = await this.characterRepository.save({ name, age, weigth, history, image });
        
        return {
            id: createdCharacter.id,
            name: createdCharacter.name,
            age: createdCharacter.age,
            weigth: createdCharacter.weigth,
            history: createdCharacter.history,
            image: createdCharacter.image
        }
    }

    async deleteCharacter(id) {
        const character = await this.finder.findById(id);
        await this.characterRepository.remove(character.id);
    }

    async updateCharacter({ id, name, age, weigth, history, image }) {
        const character = await this.finder.findById(id);

        await this.characterValidator.validateUpdateCharacter(id, { name, age, image, history, weigth });

        await this.characterRepository.update(id, { name, age, image, history, weigth })
    }

    async findCharacter(id) {
        const character = await this.finder.findByCriteria({
            where: {
                id
            },
            include: [
                {
                    model: 'Film',
                    as: 'films',
                    through: {
                        attributes: []
                    }
                }
            ]
        });

        return character;
    }

    async getAllCharacters(filter) {
        return await this.characterRepository.findAllByCriteria(filter);
    }

    async uploadImage(id, file) {
        await this.finder.findById(id);
        const imageURL = await uploader.upload(file);
        await this.characterRepository.update(id, { image: imageURL });
    }
}

module.exports = CharacterService;