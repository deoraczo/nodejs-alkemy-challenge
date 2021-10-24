const { DataTypes } = require('sequelize');

const createFilmModel = (sequelize) => {
    const Film = sequelize.define(
        'Film',
        {
            id: {
                type: DataTypes.BIGINT(11),
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },
            type: {
                type: DataTypes.ENUM(['MOVIE', 'SERIE']),
                allowNull: false
            },
            title: {
                type: DataTypes.STRING(150),
                allowNull: false
            },
            releaseDate: {
                type: DataTypes.DATE,
                allowNull: true
            },
            rating: {
                type: DataTypes.INTEGER,
                allowNull: true,
                defaultValue: 0
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
                    fields: ['title']
                }
            ]
        }
    );
    
    // Film.associate = function(models) {
    //     Film.belongsToMany(models.Character, {
    //       through: 'CharacterFilm',
    //       as: 'characters',
    //       foreignKey: 'film_id',
    //       otherKey: 'id'
    //     });
    // };
   
    return Film;
};

module.exports = createFilmModel;