const http = require('http');
const serverConfig = require('../config/serverConfig');
const createAppExpress = require('../app');
const InMemoryEventBus = require('../../../shared/domain/InMemoryEventBus');
const SendWelcomeUserEmailOnUserRegistered = require('../../../modules/auth/application/SendWelcomeUserEmailOnUserRegistered');
const UserRegisteredEvent = require('../../../modules/users/domain/UserRegisteredEvent');


class ServerBootstrap {    
    initialize(sequelize) {
        const eventBus = new InMemoryEventBus();
        eventBus.addSubscriber([
            new SendWelcomeUserEmailOnUserRegistered()
        ]);

        const app = createAppExpress(sequelize, eventBus);
        
        return new Promise((resolve, reject) => {
            const server = http.createServer(app);
            server.listen(serverConfig.PORT)
                .on('listening', () => {
                    resolve(true);
                    console.log(`Server is running on port ${server.address().port}`);
                })
                .on('error', err => {
                    reject(err);
                });
        })
    }
}

module.exports = ServerBootstrap;
