const { Router } = require('express');
const authHandler = require('../middlewares/authHandlerMiddleware');
const asyncHandler = require('../middlewares/asyncHandlerMiddleware');
const UserRepository = require('../../../modules/users/infrastructure/UserRepository');
const UserService = require('../../../modules/users/application/UserService');
const UserController = require('../controllers/UserController');

const userRouter = (sequelize, eventBus) => {
    const router = Router();

    const repository = new UserRepository(sequelize);
    const service = new UserService(repository);
    const controller = new UserController(service);

    router.get('/me', authHandler, asyncHandler(controller.me));

    return router;
}

module.exports = userRouter;