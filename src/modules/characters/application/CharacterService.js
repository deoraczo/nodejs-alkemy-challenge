const CharacterFinder = require("./CharacterFinder");
const Yup = require('yup');
const ValidationException = require("../../../shared/exceptions/ValidationException");
const { Op } = require("sequelize");

class CharacterService {
    constructor(characterRepository){
        this.characterRepository = characterRepository;
        this.finder = new CharacterFinder(characterRepository);
    }

    async createCharacter({ name, age, weigth, history, image }) {

        const validationSchema = Yup.object().shape(
            {
                name: Yup.string()
                    .strict()
                    .required()
                    .min(3)
                    .test(
                        'unique',
                        'character with this name already exists',
                        async value => {
                            if (!value) {
                                return true;
                            }

                            const nameExists = await this.finder.findByCriteria({ where: { name: value }});

                            return !nameExists;
                        }
                    ),
                age: Yup.number().integer().nullable(),
                image: Yup.string().url().nullable(),
                history: Yup.string().strict().nullable(),
                weigth: Yup.number().nullable()
            }
        );

        try {
            await validationSchema.validate({ name, age, image, history, weigth }, { abortEarly: false });
        } catch (err) {
            const validationErrors = err.inner.map(constraint => ({
                path: constraint.path,
                message: constraint.errors[0]
            }))
           throw new ValidationException(JSON.stringify(validationErrors));
        }

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

        const validationSchema = Yup.object().shape(
            {
                name: Yup.string()
                    .strict()
                    .required()
                    .min(3)
                    .test(
                        'unique',
                        'character with this name already exists',
                        async value => {
                            if (!value) {
                                return true;
                            }

                            const nameExists = await this.finder.findByCriteria(
                                { 
                                    where: { 
                                        name: value,
                                        id: {
                                            [Op.ne]: id
                                        }
                                    }
                                }
                            );

                            return !nameExists;
                        }
                    ),
                age: Yup.number().integer().nullable(),
                image: Yup.string().url().nullable(),
                history: Yup.string().strict().nullable(),
                weigth: Yup.number().nullable()
            }
        );

        try {
            await validationSchema.validate({ name, age, image, history, weigth }, { abortEarly: false });
        } catch (err) {
            const validationErrors = err.inner.map(constraint => ({
                path: constraint.path,
                message: constraint.errors[0]
            }))
           throw new ValidationException(JSON.stringify(validationErrors));
        }

        await this.characterRepository.update(id, { name, age, image, history, weigth })
    }

    async getAllCharacters() {
        return await this.characterRepository.findAllByCriteria({
            attributes: ['image', 'name']
        });
    }
}

module.exports = CharacterService;