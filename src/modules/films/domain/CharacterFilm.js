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

    return CharacterFilm;
}

module.exports = crateCharacterFilm;