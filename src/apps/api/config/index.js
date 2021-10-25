const authConfig = require("./authConfig");
const databaseConfig = require("./databaseConfig");
const fileStorageConfig = require("./fileStorageConfig");
const mailConfig = require("./mailConfig");
const serverConfig = require("./serverConfig");

module.exports = {
    serverConfig: serverConfig,
    databaseConfig: databaseConfig,
    mailConfig: mailConfig,
    authConfig: authConfig,
    fileStorageConfig: fileStorageConfig
}