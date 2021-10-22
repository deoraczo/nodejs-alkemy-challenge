require('dotenv').config({
    path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env'
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