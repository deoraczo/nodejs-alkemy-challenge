const { Router } =  require('express');
const authRouter = require('./authRouter');
const characterRouter = require('./characterRouter');
const filmRouter = require('./filmRouter');
const userRouter = require('./userRouter');

const createRouter = (sequelize, eventBus) => {
    const router = Router();
    
    router.use('/auth', authRouter(sequelize, eventBus));
    router.use('/users', userRouter(sequelize, eventBus));
    router.use('/characters', characterRouter(sequelize));
    router.use('/movies', filmRouter(sequelize));

    return router;
}

module.exports = createRouter;