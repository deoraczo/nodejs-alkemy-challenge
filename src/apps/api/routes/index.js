const { Router } =  require('express');
const authRouter = require('./authRouter');
const healthRouter = require('./healthRouter');

const router = Router();

router.use('/health', healthRouter);
router.use('/auth', authRouter);

module.exports = router;