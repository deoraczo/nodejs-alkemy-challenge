const { Router } =  require('express');
const authRouter = require('./authRouter');
const userRouter = require('./userRouter');

const createRouter = (sequelize, eventBus) => {
    const router = Router();
    
    router.use('/auth', authRouter(sequelize, eventBus));
    router.use('/users', userRouter(sequelize, eventBus));

    return router;
}

module.exports = createRouter;