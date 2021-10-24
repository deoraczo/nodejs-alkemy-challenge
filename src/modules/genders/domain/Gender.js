const { DataTypes } = require('sequelize');

const createGenderModel = (sequelize) => {
    const Gender = sequelize.define(
        'Gender',
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


module.exports = createGenderModel;