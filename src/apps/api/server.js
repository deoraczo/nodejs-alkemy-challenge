require('dotenv').config();

const http = require('http');
const app = require('./app');
const { serverConfig } = require('./config');

const server = http.createServer(app);

server.listen(serverConfig.PORT, () => {
    console.log(`Server running on port: ${serverConfig.PORT}`)
});

