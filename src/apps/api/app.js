const express = require('express');
const errorHandler = require('./middlewares/errorHandlerMiddleware');
const createRouter = require('./routes');
class AppExpress {
    constructor(sequelize) {
        this.app = express();
        this.middlewares();
        this.routes(sequelize);
        this.errorHandler();
    }

    middlewares() {
        this.app.use(express.json());        
    }
    
    routes(sequelize) {
        this.app.use('/api', createRouter(sequelize));
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

const createAppExpress = (sequelize) => new AppExpress(sequelize).app;

module.exports = createAppExpress;