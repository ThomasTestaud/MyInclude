const { DataTypes } = require('sequelize');
const sequelizeInstance = require('./_model.js');


const TaskTarget = sequelizeInstance.define('TaskTarget', {
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


module.exports = TaskTarget;
