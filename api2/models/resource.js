const { DataTypes } = require('sequelize');
const sequelizeInstance = require('./_model.js');


const Resource = sequelizeInstance.define('Resource', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    title: {
        type: DataTypes.STRING(20),
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    link: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
}, {
    indexes: [
    ]
});


module.exports = Resource;
