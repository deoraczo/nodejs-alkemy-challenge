const { DataTypes } = require("sequelize")

const crateCharacterFilm = (sequelize) => {
    const CharacterFilm = sequelize.define(
        'CharacterFilm',
        {
            id: {
                type: DataTypes.BIGINT(11),
                primaryKey: true,
                autoIncrement: true,
                allowNull: false              
            },
            characterId: {
                type: DataTypes.INTEGER,
                references: {
                    model: sequelize.models.Character,
                    key: 'id'
                }
            },
            filmId: {
                type: DataTypes.INTEGER,
                references: {
                    model: sequelize.models.Film,
                    key: 'id'
                }
            }
        },
        {
            timestamps: false
        }
    );

    //sequelize.models.Film.belongsToMany(sequelize.models.Character, { as: 'characters', through: CharacterFilm, attributes: [] });
    sequelize.models.Film.belongsToMany(sequelize.models.Character, { through: CharacterFilm, attributes: [] });
    sequelize.models.Character.belongsToMany(sequelize.models.Film, { as: 'films', through: CharacterFilm, attributes: [] });

    return CharacterFilm;
}

module.exports = crateCharacterFilm;