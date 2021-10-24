const { DataTypes } = require('sequelize');

const createCharacterModel = (sequelize) => {
    const Character = sequelize.define(
        'Character',
        {
            id: {
                type: DataTypes.BIGINT(11),
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },
            name: {
                type: DataTypes.STRING(100),
                allowNull: false,
            },
            age: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            history: {
                type: DataTypes.TEXT,
                allowNull: true
            },
            weight: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            image: {
                type: DataTypes.STRING,
                allowNull: true
            }
        },
        {
            indexes: [
                {
                    unique: true,
                    fields: ['name']
                }
            ]
        }
    );
       
    //Character.belongsToMany(sequelize.models.Film, { through: sequelize.models.CharacterFilm });   
    // Character.associate = function(models) {
    //     console.log(models);
    //     Character.belongsToMany(models.Film, {
    //       through: 'CharacterFilm',
    //       as: 'films',
    //       foreignKey: 'characterd_id',
    //       otherKey: 'id'
    //     });
    // };

    return Character;
};

module.exports = createCharacterModel;