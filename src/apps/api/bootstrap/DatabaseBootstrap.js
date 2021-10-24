const Sequelize = require('sequelize');
const createCharacterModel = require('../../../modules/characters/domain/Character');
const crateCharacterFilm = require('../../../modules/films/domain/CharacterFilm');
const createFilmModel = require('../../../modules/films/domain/Film');
const createGenderModel = require('../../../modules/genders/domain/Gender');
const createUserModel = require('../../../modules/users/domain/User');
const { databaseConfig } = require('../config');

const createModels = (sequelize) => {
    createUserModel(sequelize);
    createGenderModel(sequelize);
    createCharacterModel(sequelize);
    createFilmModel(sequelize);
    crateCharacterFilm(sequelize);
};


let connection = null;

class DatabaseBootstrap {
    initialize() {
        return new Promise(async (resolve, reject) => {
            const sequelize = new Sequelize(databaseConfig.database, databaseConfig.username, databaseConfig.password, databaseConfig);
            try {
                await sequelize.authenticate();               
                
                createModels(sequelize);
                
                await sequelize.sync({ alter: true });                
                //await sequelize.sync({ force: true });                

                connection = sequelize;

                resolve(sequelize);

                //console.log('Connection has been established successfully.');
            } catch (error) {
                reject(error);
            }
        })
    }

    getConnection() {
        return connection;
    }

    async closeConnection() {
        await connection.close();
    }
}

module.exports = DatabaseBootstrap;



