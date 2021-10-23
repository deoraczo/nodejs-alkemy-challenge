const { Router } = require('express');
const authHandler = require('../middlewares/authHandlerMiddleware');

const userRouter = (sequelize, eventBus) => {
    const router = Router();

    router.get('/me', authHandler,(req, res) => {
        return res.json({
            message: 'Me'
        });
    })

    return router;
}

module.exports = userRouter;