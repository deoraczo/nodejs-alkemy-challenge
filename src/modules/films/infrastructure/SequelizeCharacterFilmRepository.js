const SequelizeRepository = require("../../../shared/infrastructure/SequelizeRepository");

class SequelizeCharacterFilmRepository extends SequelizeRepository {
    constructor(sequelize) {
        super(sequelize, 'CharacterFilm')
    }
    
}

module.exports = SequelizeCharacterFilmRepository;