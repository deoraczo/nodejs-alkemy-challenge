const { Router } = require("express");
const GenreService = require("../../../modules/genres/application/GenreService");
const SequelizeGenreRepository = require("../../../modules/genres/infrastructure/SequelizeGenreRepository");
const GenreController = require("../controllers/GenreController");
const asyncHandler = require("../middlewares/asyncHandlerMiddleware");
const authHandler = require('../middlewares/authHandlerMiddleware');

const genreRouter = (sequelize) => {
    const router = Router();

    const repository = new SequelizeGenreRepository(sequelize);
    const service = new GenreService(repository);
    const controller = new GenreController(service);

    router.route('/')
        .get(authHandler, asyncHandler(controller.getAllGenres))
        .post(authHandler, asyncHandler(controller.createGenre));

    router.route('/:id')
        .put(authHandler, asyncHandler(controller.updateGenre));

    return router;
}


module.exports = genreRouter;