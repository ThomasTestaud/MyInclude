const { DataTypes } = require('sequelize');
const sequelizeInstance = require('./_model.js');


const UserToUser = sequelizeInstance.define('UserToUser', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
}, {
});

module.exports = UserToUser;
