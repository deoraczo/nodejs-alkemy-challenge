const { DataTypes } = require('sequelize');

const createCharacterModel = (sequelize) => {
    return sequelize.define(
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
                unique: true,
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
            weigth: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            image: {
                type: DataTypes.STRING,
                allowNull: true
            }
        }
    )
};

module.exports = createCharacterModel;