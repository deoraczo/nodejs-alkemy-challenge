const { Router } = require('express');
const AuhtService = require('../../../modules/auth/application/AuhtService');
const UserRepository = require('../../../modules/users/infrastructure/UserRepository');
const DatabaseBootstrap = require('../bootstrap/DatabaseBootstrap');
const AuhtController = require('../controllers/AuthController');
const asyncHandler = require('../middlewares/asyncHandlerMiddleware');

const authRouter = (sequelize) => {
    const router = Router();

    const userRepository = new UserRepository(sequelize);
    const authService = new AuhtService(userRepository);
    const auhtController = new AuhtController(authService);

    router.post('/login', auhtController.signin);
    router.post('/register', asyncHandler(auhtController.signup))

    return router;
}

module.exports = authRouter;