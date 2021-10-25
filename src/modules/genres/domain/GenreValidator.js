const { Op } = require('sequelize');
const Yup = require('yup');
const errorSeliarizer = require('../../../shared/domain/validators/errorSerializer');


class GenreValidator {

    constructor(repository) {
        this.repository = repository;
    }

    async validateCreateGenre(req) {
        const schemaValidation = Yup.object().shape({
            name: Yup.string()
                .required()
                .strict()
                .min(4)
                .max(20)
                .test(
                    'unique',
                    'Genre whit this name already exists',
                    async value => {
                        if (!value) {
                            return true;
                        }

                        const nameExists = await this.repository.findByCriteria({ where: { name: value } });

                        return !nameExists;
                    }
                )
        })


        try {
            await schemaValidation.validate({ ...req },  { abortEarly: false });
        } catch (error) {
            errorSeliarizer(error);
        }
    }

    async validateUpdateGenre(id, req) {
        const schemaValidation = Yup.object().shape({
            name: Yup.string()  
                .required()
                .strict()
                .min(4)
                .max(20)
                .test(
                    'unique',
                    'Genre with this name already exists',
                    async value => {
                        if (!value) {
                            return true;
                        }

                        const nameExitst = await this.repository.findByCriteria({
                            where: {
                                name: value,
                                id: {
                                    [Op.ne]: id
                                }
                            }
                        });

                        return !nameExitst;
                    }
                )
        })

        try {
            await schemaValidation.validate({ ...req },  { abortEarly: false });
        } catch (error) {
            errorSeliarizer(error);
        }
    }
}

module.exports = GenreValidator;