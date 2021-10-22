const { Router } =  require('express');
const authRouter = require('./authRouter');

const createRouter = (sequelize) => {
    const router = Router();
    
    router.use('/auth', authRouter(sequelize));

    return router;
}

module.exports = createRouter;