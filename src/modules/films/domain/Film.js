const { DataTypes } = require('sequelize');

const createFilmModel = (sequelize) => {
    return sequelize.define(
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
                unique: true,
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

        }
    );
};

module.exports = createFilmModel;