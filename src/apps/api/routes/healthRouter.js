const { Router } = require('express');

const healthRouter = Router();


healthRouter.get('/', (req, res) => {
    return res.json({
        message: 'Hello, Wordl!'
    });
});

module.exports = healthRouter;
