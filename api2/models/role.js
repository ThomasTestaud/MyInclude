const { DataTypes } = require('sequelize');
const sequelizeInstance = require('./_model.js');

const Role = sequelizeInstance.define('Role', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING(20),
        allowNull: false,
    },
}, {
    indexes: [
        {unique: true, fields: ['name']},
    ]
});

module.exports = Role;
