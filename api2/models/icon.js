const { DataTypes } = require('sequelize');
const sequelizeInstance = require('./_model.js');

const Icon = sequelizeInstance.define('Icon', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING(20),
        allowNull: false,
        unique: true,
    },
    path: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    
}, {
    indexes: [
        {unique: true, fields: ['name']},
    ]
});

module.exports = Icon;
