const { DataTypes } = require("sequelize")

const crateCharacterFilm = (sequelize) => {
    const CharacterFilm = sequelize.define(
        'CharacterFilm',
        {
            id: {
                type: DataTypes.BIGINT(11),
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,            
            },
            characterId: {
                type: DataTypes.BIGINT(11),
                references: {
                    model: sequelize.models.Character,
                    key: 'id'
                },
                allowNull: false,
            },
            filmId: {
                type: DataTypes.BIGINT(11),
                references: {
                    model: sequelize.models.Film,
                    key: 'id'
                },
                allowNull: false,
            }
        },
        {
            timestamps: false
        }
    );

    sequelize.models.Film.belongsToMany(sequelize.models.Character, { through: CharacterFilm, as: 'characters' });
    sequelize.models.Character.belongsToMany(sequelize.models.Film, { through: CharacterFilm, as: 'films' });
   /* sequelize.models.Film.belongsToMany(sequelize.models.Character, {
        through: 'character_films',
        as: 'characters',
        foreignKey: 'character_id'
    });

    sequelize.models.Character.belongsToMany(sequelize.models.Film, {
        through: 'character_films',
        as: 'films',
        foreignKey: 'film_id'
    });*/

    return CharacterFilm;
}

module.exports = crateCharacterFilm;