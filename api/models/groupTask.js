const { DataTypes } = require('sequelize');
const sequelizeInstance = require('./_model.js');

const GroupTask = sequelizeInstance.define('GroupTask', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING(30),
        allowNull: false,
    },
}, {
    indexes: [
    ]
});

module.exports = GroupTask;
