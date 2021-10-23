const SequelizeRepository = require("../../../shared/infrastructure/SequelizeRepository");

class SequelizeFilmRepository extends SequelizeRepository {
    constructor(sequelize) {
        super(sequelize, 'Film');
    }


}

module.exports = SequelizeFilmRepository;