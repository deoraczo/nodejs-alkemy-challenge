const { Router } =  require('express');
const authRouter = require('./authRouter');

const createRouter = (sequelize, eventBus) => {
    const router = Router();
    
    router.use('/auth', authRouter(sequelize, eventBus));

    return router;
}

module.exports = createRouter;