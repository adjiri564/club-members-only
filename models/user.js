const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/database');

class User extends Model{}

User.init({
    firstName:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    username: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    membershipStatus: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    isAdmin:{
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false
    },
},{
    sequelize,
    modelName: 'User',
});

module.exports = User;
