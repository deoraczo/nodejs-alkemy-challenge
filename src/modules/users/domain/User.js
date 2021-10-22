const { DataTypes } = require("sequelize")

const createUserModel = (sequelize) => {
    return sequelize.define(
        'User',
        {
            id: {
                type: DataTypes.BIGINT(11),
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },
            name: {
                type: DataTypes.STRING(150),
                allowNull: false
            },
            email: {
                type: DataTypes.STRING(150),
                unique: true,
                allowNull: false
            },
            password: {
                type: DataTypes.STRING(80),
                allowNull: false
            },
            status: {
                type: DataTypes.ENUM(['ACTIVE', 'INACTIVE']),
                allowNull: false,
                defaultValue: 'ACTIVE'
            },
            createdAt: {
                type: DataTypes.DATE,
                allowNull: false
            },
            updatedAt: {
                type: DataTypes.DATE,
                allowNull: false
            }
        }
    );
}

module.exports = createUserModel;

