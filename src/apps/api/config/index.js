const authConfig = require("./authConfig");
const databaseConfig = require("./databaseConfig");
const mailConfig = require("./mailConfig");
const serverConfig = require("./serverConfig");

module.exports = {
    serverConfig: serverConfig,
    databaseConfig: databaseConfig,
    mailConfig: mailConfig,
    authConfig: authConfig
}