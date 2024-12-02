const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/database');
const User = require('./user')
class Message extends Model{}

Message.init({
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    text: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    timestamp: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
},{
    sequelize,
    modelName: 'Message',
});

//associations
User.hasMany(Message,{foreignKey: 'userId'});
Message.belongsTo(User, {foreignKey: 'userId'});

module.exports = Message;