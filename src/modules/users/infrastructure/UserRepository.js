const SequelizeRepository = require('../../../shared/infrastructure/SequelizeRepository');

class UserRepository extends SequelizeRepository {
    constructor(sequelize) {
        super(sequelize, 'User')
    }
}

module.exports = UserRepository;