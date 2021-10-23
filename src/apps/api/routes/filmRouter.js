const { Router } = require('express');
const FilmService = require('../../../modules/films/application/FilmService');
const SequelizeFilmRepository = require('../../../modules/films/infrastructure/SequelizeFilmRepository');
const FilmController = require('../controllers/FilmController');
const asyncHandler = require('../middlewares/asyncHandlerMiddleware');
const authHandler = require('../middlewares/authHandlerMiddleware');

const filmRouter = (sequelize) => {
    const router = Router();
    const repository = new SequelizeFilmRepository(sequelize);
    const service = new FilmService(repository);
    const controller = new FilmController(service);

    router.route('/')
        .get(authHandler, asyncHandler(controller.getFilms))
        .post(authHandler, asyncHandler(controller.createFilm));
    
    router.route('/:id')
        .put(authHandler, asyncHandler(controller.updateFilm))
        .delete(authHandler, asyncHandler(controller.deleteFilm));

    return router;
}

module.exports = filmRouter;