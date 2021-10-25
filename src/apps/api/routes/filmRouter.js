const { Router } = require('express');
const SequelizeCharacterRepository = require('../../../modules/characters/infrastructure/SequelizeCharacterRepository');
const CharacterFilmService = require('../../../modules/films/application/CharacterFilmService');
const FilmService = require('../../../modules/films/application/FilmService');
const SequelizeCharacterFilmRepository = require('../../../modules/films/infrastructure/SequelizeCharacterFilmRepository');
const SequelizeFilmRepository = require('../../../modules/films/infrastructure/SequelizeFilmRepository');
const SequelizeGenreRepository = require('../../../modules/genres/infrastructure/SequelizeGenreRepository');
const CharacterFilmController = require('../controllers/CharacterFilmController');
const FilmController = require('../controllers/FilmController');
const asyncHandler = require('../middlewares/asyncHandlerMiddleware');
const authHandler = require('../middlewares/authHandlerMiddleware');
const uploadHanlder = require('../middlewares/uploadHandlerMiddleware');

const filmRouter = (sequelize) => {
    const router = Router();

    const characterRepository = new SequelizeCharacterRepository(sequelize);
    const genreRepository = new SequelizeGenreRepository(sequelize);

    const repository = new SequelizeFilmRepository(sequelize);
    const service = new FilmService(repository, genreRepository);
    const controller = new FilmController(service);

    const charaFilmRepository = new SequelizeCharacterFilmRepository(sequelize);
    const characterFilmService = new CharacterFilmService(charaFilmRepository, repository, characterRepository);
    const characterFilmController = new CharacterFilmController(characterFilmService);

    router.route('/')
        .get(authHandler, asyncHandler(controller.getFilms))
        .post(authHandler, asyncHandler(controller.createFilm));
    
    router.route('/:id')
        .get(authHandler, asyncHandler(controller.getFilm))
        .put(authHandler, asyncHandler(controller.updateFilm))
        .delete(authHandler, asyncHandler(controller.deleteFilm));

    router.route('/:movieId/characters/:characterId')
        .post(authHandler, asyncHandler(characterFilmController.addCharacter));

    router.post('/:id/upload', authHandler, uploadHanlder.single('image'), asyncHandler(controller.upload));

    return router;
}

module.exports = filmRouter;