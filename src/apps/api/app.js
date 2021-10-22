const express = require('express');
const errorHandler = require('./middlewares/errorHandlerMiddleware');
const createRouter = require('./routes');
class AppExpress {
    constructor(sequelize, eventBus) {
        this.app = express();
        this.middlewares();
        this.routes(sequelize, eventBus);
        this.errorHandler();
    }

    middlewares() {
        this.app.use(express.json());        
    }
    
    routes(sequelize, eventBus) {
        this.app.use('/api', createRouter(sequelize, eventBus));
        this.app.get('/api/health', (req, res) => {
            return res.json({
                message: "I'am live"
            });
        })
    }

    errorHandler() {
        this.app.use(errorHandler);
    }
}

// module.exports = (sequelize) => new AppExpress(sequelize).app;

const createAppExpress = (sequelize, eventBus) => new AppExpress(sequelize, eventBus).app;

module.exports = createAppExpress;