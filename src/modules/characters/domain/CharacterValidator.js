const Yup = require('yup');
const { Op } = require('sequelize');
const ValidationException = require('../../../shared/exceptions/ValidationException');
const errorSeliarizer = require('../../../shared/domain/validators/errorSerializer');

class CharacterValidator {
    constructor(repository) {
        this.repository = repository;
    }

    async validateUpdateCharacter(characterId, request) {
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

                            const nameExists = await this.repository.findByCriteria(
                                { 
                                    where: { 
                                        name: value,
                                        id: {
                                            [Op.ne]: characterId
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
            await validationSchema.validate({ ...request }, { abortEarly: false });
        } catch (err) {
            errorSeliarizer(err);
        }
    }

    async validateCreateCharacter(request) {
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

                            const nameExists = await this.repository.findByCriteria({ where: { name: value }});

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
            await validationSchema.validate({ ...request }, { abortEarly: false });
        } catch (err) {
            errorSeliarizer(err);
        }
    }
}

module.exports = CharacterValidator;