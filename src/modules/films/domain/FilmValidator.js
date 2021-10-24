const Yup = require('yup');
const errorSeliarizer = require('../../../shared/domain/validators/errorSerializer');
const { Op } = require('sequelize');

class FilmValidator {
    constructor(repository, genderRepository) {
        this.repository = repository;
        this.genderRepository = genderRepository;
    }

    async validateCreateFilm(request) {
        const validationSchema = Yup.object().shape({
            type: Yup.mixed().oneOf(['movie', 'serie']).required(),
            title: Yup.string()
                .strict()
                .required()
                .min(4)
                .test(
                    'unique',
                    'movie with this name already exists',
                    async value => {
                        if (!value) {
                            return true;
                        }

                        const titleExists = await this.repository.findByCriteria({ where: { title: value } });

                        return !titleExists;
                    }
                ),
            releaseDate: Yup.date().nullable(),
            rating: Yup.number()
                .integer()
                .min(1)
                .max(5)
                .nullable(),
            image: Yup.string().url().nullable(),
            genderId: Yup.number().integer().required()
                    .test(
                        'exists',
                        'The selected genderId is invalid',
                        async value => {
                            if (!value) {
                                return true;
                            }
                            
                            const genderExists = await this.genderRepository.findById(value);
                            return genderExists != null;
                        }
                    )
        })

        try {
            await validationSchema.validate({ ...request }, { abortEarly: false });
        } catch (error) {
            errorSeliarizer(error);
        }
    }

    async validateUpdateFilm(id, request) {
        const validationSchema = Yup.object().shape({
            type: Yup.mixed().oneOf(['movie', 'serie']).required(),
            title: Yup.string().strict().required()
                .min(4)
                .test(
                    'unique',
                    'movie with this title already exists',
                    async value => {
                        if (!value) {
                            return true;
                        }

                        const titleExists = await this.repository.findByCriteria(
                            {
                                where: {
                                    title: value,
                                    id: {
                                        [Op.ne]: id
                                    }
                                }
                            }
                        );

                        return !titleExists;
                    }
                ),
            releaseDate: Yup.date().nullable(),
            rating: Yup.number().integer().min(1).max(5).nullable(),
            image: Yup.string().url().nullable(),
            genderId: Yup.number().integer().required()
                    .test(
                        'exists',
                        'The selected genderId is invalid',
                        async value => {
                            if (!value) {
                                return true;
                            }

                            const genderExists = await this.genderRepository.findById(value);
                            return genderExists != null;
                        }
                    )
        });

        try {
            await validationSchema.validate({ ...request }, { abortEarly: false });
        } catch (error) {
            errorSeliarizer(error)
        }
    }
}

module.exports = FilmValidator;