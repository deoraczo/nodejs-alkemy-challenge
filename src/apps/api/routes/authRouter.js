const { Router } = require('express');
const AuhtController = require('../controllers/AuthController');

const auhtController = new AuhtController();

const authRouter = Router();

authRouter.post('/sigin', auhtController.signin);

module.exports = authRouter;