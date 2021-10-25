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
                type: DataTypes.DATEONLY,
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
            },
            genreId: {
                type: DataTypes.BIGINT(11),
                references: {
                    model: sequelize.models.Genre,
                    key: 'id'
                }
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
    
    Film.belongsTo(sequelize.models.Genre, {
        as: 'genre'
    });
   
    return Film;
};

module.exports = createFilmModel;