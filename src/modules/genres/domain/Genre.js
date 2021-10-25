const { DataTypes } = require('sequelize');

const createGenreModel = (sequelize) => {
    const Genre = sequelize.define(
        'Genre',
        {
            id: {
                type: DataTypes.BIGINT(11),
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },
            name: {
                type: DataTypes.STRING(20),
                allowNull: false
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
}


module.exports = createGenreModel;