const envPath = () => {
    const nodeEnv = process.env.NODE_ENV;

    if (nodeEnv === 'test') {
        return '.env.test';
    }

    if (nodeEnv === 'dev') {
        return '.env.dev';
    }
    

    return '.env'
}

require('dotenv').config({
    path: envPath()
});

const app = require('./app');
const DatabaseBootstrap = require('./bootstrap/DatabaseBootstrap');
const ServerBootstrap = require('./bootstrap/ServerBootstrap');

const start = async () => {
    const databaseBootstrap = new DatabaseBootstrap(app);
    const serverBootstrap = new ServerBootstrap();

    try {
        const sequelize = await databaseBootstrap.initialize();
        await serverBootstrap.initialize(sequelize);
    } catch (err) {
        console.log('Error', err);
    }
};

start();