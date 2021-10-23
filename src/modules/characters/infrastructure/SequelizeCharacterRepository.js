const SequelizeRepository = require("../../../shared/infrastructure/SequelizeRepository");

class SequelizeCharacterRepository extends SequelizeRepository {
    constructor(sequelize) {
        super(sequelize, 'Character');
    }
}

module.exports = SequelizeCharacterRepository;