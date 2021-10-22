const http = require('http');
const serverConfig = require('../config/serverConfig');
const createAppExpress = require('../app');


class ServerBootstrap {    
    initialize(sequelize) {
        const app = createAppExpress(sequelize);
        
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
