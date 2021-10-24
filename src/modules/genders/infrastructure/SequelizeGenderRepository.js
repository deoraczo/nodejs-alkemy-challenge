const SequelizeRepository = require("../../../shared/infrastructure/SequelizeRepository");

class SequelizeGenderRepository extends SequelizeRepository {
    constructor(sequelize) {
        super(sequelize, 'Gender');
    }
}

module.exports = SequelizeGenderRepository;