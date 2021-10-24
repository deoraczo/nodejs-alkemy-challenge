const { Router } = require('express');
const CharacterFilmService = require('../../../modules/films/application/CharacterFilmService');
const FilmService = require('../../../modules/films/application/FilmService');
const SequelizeCharacterFilmRepository = require('../../../modules/films/infrastructure/SequelizeCharacterFilmRepository');
const SequelizeFilmRepository = require('../../../modules/films/infrastructure/SequelizeFilmRepository');
const CharacterFilmController = require('../controllers/CharacterFilmController');
const FilmController = require('../controllers/FilmController');
const asyncHandler = require('../middlewares/asyncHandlerMiddleware');
const authHandler = require('../middlewares/authHandlerMiddleware');

const filmRouter = (sequelize) => {
    const router = Router();
    const repository = new SequelizeFilmRepository(sequelize);
    const service = new FilmService(repository);
    const controller = new FilmController(service);

    const charaFilmRepository = new SequelizeCharacterFilmRepository(sequelize);
    const characterFilmService = new CharacterFilmService(charaFilmRepository);
    const characterFilmController = new CharacterFilmController(characterFilmService);

    router.route('/')
        .get(authHandler, asyncHandler(controller.getFilms))
        .post(authHandler, asyncHandler(controller.createFilm));
    
    router.route('/:id')
        .put(authHandler, asyncHandler(controller.updateFilm))
        .delete(authHandler, asyncHandler(controller.deleteFilm));

    router.route('/:movieId/characters/:characterId')
        .post(authHandler, asyncHandler(characterFilmController.addCharacter));

    return router;
}

module.exports = filmRouter;