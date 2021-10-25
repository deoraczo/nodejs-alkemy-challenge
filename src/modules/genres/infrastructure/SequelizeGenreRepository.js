const SequelizeRepository = require("../../../shared/infrastructure/SequelizeRepository");

class SequelizeGenreRepository extends SequelizeRepository {
    constructor(sequelize) {
        super(sequelize, 'Genre');
    }
}

module.exports = SequelizeGenreRepository;